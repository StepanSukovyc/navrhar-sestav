<%@ MasterType TypeName="Gordic.WebUI.Gui.GTab" %>
<%@ Page Title="GBalikyTypuAIPVDigitSpi" MasterPageFile="~/Gin/MasterPages/GTab/GTab.Master" Language="C#" AutoEventWireup="True" CodeBehind="GBalikyTypuAIPVDigitSpi.aspx.cs" Inherits="Gordic.Spi.WebClient.GBalikyTypuAIPVDigitSpi" %>

<%@ Register TagPrefix="gui" Namespace="Gordic.WebUI.Gui" Assembly="Gordic.WebUI.Gui" %>
<%@ OutputCache Location="None" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
	<script type="text/javascript">	
	    function CMRowBal(event, ixs_zup) {	// Kontextove menu 
	        PopUp = createIPopup();
	        PopUp.addItem("jres:26285298", "Gin/detail", "DetailBaliku('" + ixs_zup + "');"); // 26285160 : Detail balíku
	        PopUp.addSeparator();
	        PopUp.addItem("jres:26285164", "gin/obcerstvit", "Obcerstvit();"); 
            PopUp.popup(event, 155);
	    }
    </script>	
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Design" runat="server">
    <gui:GTabSettings ID="MasterPageSettings" runat="server" 
        ActionButtonsVisible="True"
        PageName="GBalikyTypuAIPVDigitSpi" 
        OkVisible="False" 
        CancelVisible="False"
        HelpTopicId="GBalikyTypuAIPVDigitSpi"
        FilterContentPlaceHolderHeight="80"
        ContentPadding="false"
        EnablePageMethods="false" 
        WflScript="true"
        SslScript="true" 
        CanSubmitBeforeLoad="false"
        >         
	</gui:GTabSettings> 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Filter" runat="server">
    <gor:GFromToDate id="tbDatVzniku" Top="20px" Left="15px" Js="true" LabelWidth="50" runat="server" /> 
    <gor:GIXSInput id="tbIxsZupNad" Top="10px" Left="240px" runat="server" TextBoxWidth="100" LabelWidth="100" Required="false" HorizontalOrientation="true" LabelText="gres:26285524" />	  	
</asp:Content>