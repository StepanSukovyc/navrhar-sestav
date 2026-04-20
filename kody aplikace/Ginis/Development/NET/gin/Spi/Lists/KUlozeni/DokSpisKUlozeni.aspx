<%@ MasterType TypeName="Gordic.WebUI.Gui.GTab" %>
<%@ Page Title="DokSpisKUlozeni" MasterPageFile="~/Gin/MasterPages/GTab/GTab.Master" Language="C#" AutoEventWireup="True" CodeBehind="DokSpisKUlozeni.aspx.cs" Inherits="Gordic.Spi.WebClient.DokSpisKUlozeni" %>

<%@ Register TagPrefix="gui" Namespace="Gordic.WebUI.Gui" Assembly="Gordic.WebUI.Gui" %>
<%@ Register TagPrefix="report" Namespace="Gordic.Report.WebClient" Assembly="Gordic.Report.WebClient" %>
<%@ OutputCache Location="None" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">

	<script type="text/javascript">
	    function CMRowDok(event, ixp) 
        {	// Kontextove menu 
	        PopUp = createIPopup();
	        PopUp.addItem("jres:26285240", "Wfl/dokspis_detail", "Detail('" + ixp + "');"); // 26285240 : Detail dokumentu / spisu
	        PopUp.addSeparator();
	        PopUp.addItem("jres:26285412", "Wfl/ulozit", "SpiCommon_Ulozit(0);"); // 26285412 : Uložit       
	        PopUp.addSeparator();
	        //PopUp.addItem("jres:26285300", "Ssl/vlozit_do_baliku", "VlozitDoBaliku();"); // 26285300 : Vložit do balíku
	        PopUp.addItem("jres:Gordic.Wfl.WebClient:26225222", "Ssl/vlozit_do_baliku", "SpiCommon_VlozitDoBaliku();");
	        PopUp.addItem("jres:Gordic.Wfl.WebClient:26226093", "Ssl/balik_novy", "SpiCommon_VytvoritBalikAVlozit();");
	        PopUp.addSeparator();
	        PopUp.addItem("jres:26285303", "Gin/vypujcit", "SpiCommon_Vypujcit();"); // 26285303 : Vypùjèit
	        PopUp.addItem("jres:26285342", "Wfl/spisovy_znak", "ZmenaSpisZnaku();"); // 26285342 : Zmìna spisového znaku	        
            PopUp.addSeparator();
            PopUp.addItem("jres:26285261", "Ssl/sip_balicek_generovat", "SpiCommon_GenerujSIP();"); // 26285261 : Generovat SIP
	        if (m_oESpisovna)
	        {
	            PopUp.addItem("jres:26285455", "Gin/kontrola", "WflCommon_KontrolaMetadat();"); // 26285455 : Kontrola metadat
	        }
	        PopUp.addSeparator();
	        PopUp.addItem("jres:26285164", "Gin/obcerstvit", "Obcerstvit();"); // 26285164 : Obèerstvit
	        PopUp.popup(event, 155);
	    }

	    //function VlozitDoBaliku()
	    //{
	    //    if (!JsouOznacenyRadky())
	    //        return false;

	    //    var retVal = Spi_OtevriVyhledaniBalikuDleIdentifikace("?Vlozeni=1");

	    //    if (retVal != null)
        //    {
	    //        var l_sIxsZup = retVal.values[0];
	    //        GinisEvent( 'VlozitDoBaliku', l_sIxsZup );
	    //    }
	    //    return false;
	    //}
    </script>			
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Design" runat="server">
    <gui:GTabSettings ID="MasterPageSettings" runat="server" 
        ActionButtonsVisible="True"
        PageName="DokSpisKUlozeni" 
        OkVisible="False" 
        CancelVisible="False"
        HelpTopicId="DokSpisKUlozeni"
        FilterContentPlaceHolderHeight="50"
        ContentPadding="false"
        EnablePageMethods="false" 
        WflScript="true"
        SslScript="true" 
        CanSubmitBeforeLoad="false"
        >  
        
        <Services>
            <asp:ServiceReference Path="~/Gin/Wfl/WS/WSOperationWfl.asmx" />
            <asp:ServiceReference Path="~/Gin/Ssl/WS/WSOperationSsl.asmx" />
            <asp:ServiceReference Path="~/Gin/Spi/WS/WSOperationSpi.asmx" />        
        </Services>

	</gui:GTabSettings> 
</asp:Content>