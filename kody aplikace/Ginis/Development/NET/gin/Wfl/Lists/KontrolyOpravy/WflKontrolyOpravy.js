function OpravitNevalidniData()
{
    if (IsSelectedRow())
    {
        GinisEvent('Oprava');
    }
}

function OznacitJakoPdfA()
{
    if (IsSelectedRow())
    {
        GinisEvent('OznacitJakoPdfA');
    }
}

function ZadostZmenaDatovehoFormatu()
{
    if (IsSelectedRow())
    {
        GinisEvent('ZadostZmenaDatovehoFormatu');
    }
}

function Reload()
{
    GinisEvent('LoadData');
}

function ZmenaDatovehoFormatu()
{
    if (IsSelectedRow())
    {
        if (m_oPagingGrid != null)
        {
            if (m_oPagingGrid.checked.length != 0) {
                var i;
                for (i = 0; i < m_oPagingGrid.checked.length; i++)
                {
                    var l_sIxp = m_oPagingGrid.checked[i].substr(0, 12);
                    var l_sIxb = m_oPagingGrid.checked[i].substr(12, 12);
                    ZmenaDatovehoFormatuDialog(l_sIxp, l_sIxb, "");
                }
            }
        }
    }
}

function ReloadSpitkon()
{
    GinisEvent('ReloadSpitkon');
}

//function ZmenaDatovehoFormatuDialog(l_sIxp, l_sIxb)
//{
//    //debugger;
//    //SpustPleaseWait('');

//    Gordic.Rak.Utils.ZmenaDatovehoFormatuElDokumentu(l_sIxp, l_sIxb, this)
//    .done(function (retVal) {
//        //PleaseWaitStop();
//        GinisEvent('ReloadSpitkon');
//    })
//    .fail(function (msg) {
//        console.log("Pøi volání metody ZmenaDatovehoFormatuElDokumentu došlo k chybì.");
//        if (msg) {
//            GDlg.alert("Nepodaøilo se provést zmìnu datového formátu." + "\n\nDùvod: " + msg.responseJSON.exception.shortMessage);
//        }
//        else {
//            GDlg.alert("Nepodaøilo se provést zmìnu datového formátu.");
//        }
//    });
//}

function OveritFormat()
{
    if (IsSelectedRow())
    {
        GinisEvent('OveritFormat');
    }
}

function OpenOpravaNevalidDokSpis()
{
    var oReturn = ShowModalWindowEx(encodeURI("~/Gin/Wfl/Lists/KontrolyOpravy/OpravaNevalidDokSpis.aspx"), "jres:23900021", 625, 400, false, true, true, "OpravaNevalidDokSpis");
    if (oReturn != null)
    {
        GinisEvent('ReloadSpitkon');
    }
}

var m_bReloadSpitkon = false;

function OpenHromadnaOpravaMetadat()
{
    var oReturn = ShowModalWindowEx(encodeURI("~/Gin/Wfl/Lists/KontrolyOpravy/HromadnaOpravaMetadat.aspx?wid=" + window.PageID), "jres:23900025", 725, 500, false, true, true, "HromadnaOpravaMetadat"); //RC 23900025 : Oprava metadat
    if (oReturn != null)
    {
        m_bReloadSpitkon = true;
    }
    if (m_bReloadSpitkon)
    {
        GinisEvent('ReloadSpitkon');
    }
}
