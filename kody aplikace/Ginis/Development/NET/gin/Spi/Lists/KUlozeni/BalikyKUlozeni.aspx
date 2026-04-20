<%@ MasterType TypeName="Gordic.WebUI.Gui.GTab" %>
<%@ Page Title="BalikyKUlozeni" MasterPageFile="~/Gin/MasterPages/GTab/GTab.Master" Language="C#" AutoEventWireup="True" CodeBehind="BalikyKUlozeni.aspx.cs" Inherits="Gordic.Spi.WebClient.BalikyKUlozeni" %>

<%@ Register TagPrefix="gui" Namespace="Gordic.WebUI.Gui" Assembly="Gordic.WebUI.Gui" %>
<%@ Register TagPrefix="ginwc" Namespace="Gordic.Gin.WebClient" Assembly="Gordic.Gin.WebClient" %>
<%@ Register TagPrefix="report" Namespace="Gordic.Report.WebClient" Assembly="Gordic.Report.WebClient" %>
<%@ OutputCache Location="None" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
	<script type="text/javascript">	
	    function CMRowBal(event, ixs_zup) {	// Kontextove menu 
	        PopUp = createIPopup();
	        PopUp.addItem("jres:26285298", "Gin/detail", "DetailBaliku('" + ixs_zup + "');"); // 26285160 : Detail balíku
	        PopUp.addSeparator();
	        PopUp.addItem("jres:26285412", "Wfl/ulozit", "SpiCommon_Ulozit(1);"); // 26285412 : Uložit
	        PopUp.addSeparator();
	        PopUp.addItem("jres:26285282", "Ssl/sip_balicek_generovat", "SpiCommon_GenerujSIP();"); // 26285282 : Generovat SIP
	        if (m_oESpisovna)
	        {
	            PopUp.addItem("jres:26285455", "Gin/kontrola", "WflCommon_KontrolaMetadat();"); // 26285455 : Kontrola metadat
	            PopUp.addSeparator();
	        }
	        if(m_nGduTypInstPar > 0) {
	            PopUp.addItem("jres:26285586", "Gin/soubor_download", "UlozitAipNaDisk('" + ixs_zup + "');"); // 26285586 : Stáhnout balíèek
	            PopUp.addSeparator();
	        }
	        PopUp.addItem("jres:26285164", "gin/obcerstvit", "Obcerstvit();"); // 26285164 : Obèerstvit
            PopUp.popup(event, 155);
        }
        function UlozitAipNaDisk(ixp) {
            var l_sIxbBalicku = m_oPagingGrid.rowsData[ixp].ixb_aip;

            if (l_sIxbBalicku != "" && l_sIxbBalicku != "0000AWX00007") { // pokud je spravne ulozen
                GinisEvent("UlozitSipNaDisk", l_sIxbBalicku);
            }
        }
        function DownloadAip() {
            var aUrl = "../../../Wfl/ElObrazPrilohy/GDownloadFile.aspx";
            $get("m_oDownloadFileIFrame").src = aUrl;
        }
    </script>	
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Design" runat="server">
    <gui:GTabSettings ID="MasterPageSettings" runat="server" 
        ActionButtonsVisible="True"
        PageName="BalikyKUlozeni" 
        OkVisible="False" 
        CancelVisible="False"
        HelpTopicId="BalikyKUlozeni"
        FilterContentPlaceHolderHeight="85"
        ContentPadding="false"
        EnablePageMethods="false" 
        WflScript="true"
        SslScript="true" 
        CanSubmitBeforeLoad="false"
        >  
        
        <Services>
            <asp:ServiceReference Path="~/Gin/Wfl/WS/WSOperationWfl.asmx" />
        </Services>

	</gui:GTabSettings> 
    <iframe src="" id="m_oDownloadFileIFrame" name="m_oDownloadFileIFrame" style="height:1px; width:1px; display:none;"></iframe>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="Filter" runat="server">
    <gor:GLabel id="m_oLabelDatum"  Text="gres:26285286" Top="10px" Left="100px" runat="server"></gor:GLabel>
    <gor:GFromToDate id="m_oFromToDate" Top="23px" Left="105px" Js="true" LabelWidth="50" runat="server" /> 
    <gor:GIntegerInput id="m_oRokSkartace" Top="10px" Left="360px" MinimumValue="1901" MaximumValue="2999" runat="server" LabelWidth="70" TextBoxWidth="70" Orientation="SemiVertical" LabelText="gres:26285063" UpDownButtons="true" MaximumLength="10" Js="true" />
</asp:Content>
