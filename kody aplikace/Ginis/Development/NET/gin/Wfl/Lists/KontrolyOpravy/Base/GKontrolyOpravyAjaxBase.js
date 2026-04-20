var KOB = {

    Opravit: function ()
    {
        this.OpravitNevalidniData();       
    },

    OpravitNevalidniData: function ()
    {
        var l_context = $.content(document.getElementById("m_oPagingGridOprava"));
        if (WFLLB.IsSelectedRow(l_context))
        {
            var l_sel = l_context.PagingGrid.getSelectedValue()
            var selRow = l_context.PagingGrid.rowsData[l_sel];
            if (selRow) {
                var l_oJsonPars = { Ixp: selRow.ixp, Ixb: selRow.ixb, CisloChyby: selRow.ixb };
                l_context.call(["Oprava", l_oJsonPars]);
            }
        }           
    },
    
    OznacitJakoPdfA: function ()
    {
        if (WFLLB.IsSelectedRow())  GinisEvent('OznacitJakoPdfA');
    },
    
    ZmenaDatovehoFormatu: function ()
    {


        if (WFLLB.IsSelectedRow()) GinisEvent('ZmenaDatovehoFormatu');
    },

    ZmenaDatovehoFormatuHromadne: function ()
    {

        if (WFLLB.IsSelectedRow()) GinisEvent('ZmenaDatovehoFormatu');
    },

    Reload: function () {
        var det = this.contentDiv;

        // toto prime volani parenta nahradit eventou, triggerem
        // pripadne volanim parent na elementu nejak takto $( "p" ).parent( ".selected" ).css( "background", "yellow" );
        this.contentDiv.parentContentDiv.content.Reload(); // volat na parent contentu
    },

    OveritFormat: function ()
    {
        if (WFLLB.IsSelectedRow())  GinisEvent('OveritFormat');
    },

    OpenOpravaNevalidDokSpis: function ()
    {
        var oReturn = ShowModalWindowEx(encodeURI("~/Gin/Wfl/Lists/KontrolyOpravy/OpravaNevalidDokSpis.aspx"), "jres:23900021", 625, 400, false, true, true, "OpravaNevalidDokSpis");
        if (oReturn != null)
        {
            GinisEvent('ReloadSpitkon');
        }
    },

    OpenHromadnaOpravaMetadat: function ()
    {
        var m_bReloadSpitkon = false;
        var oReturn = ShowModalWindowEx(encodeURI("~/Gin/Wfl/Lists/KontrolyOpravy/HromadnaOpravaMetadat.aspx?wid=" + window.PageID), "jres:23900025", 725, 500, false, true, true, "HromadnaOpravaMetadat"); //RC 23900025 : Oprava metadat
        if (oReturn != null)
        {
            m_bReloadSpitkon = true;
        }
        if (m_bReloadSpitkon)
        {
            GinisEvent('ReloadSpitkon');
        }
    },
}





