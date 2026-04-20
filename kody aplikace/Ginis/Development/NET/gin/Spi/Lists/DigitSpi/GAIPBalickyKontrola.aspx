    <%@ MasterType TypeName="Gordic.WebUI.Gui.GTab" %>
<%@ Page Title="GAIPBalickyKontrolaControl" MasterPageFile="~/Gin/MasterPages/GTab/GTab.Master" Language="C#" AutoEventWireup="True" CodeBehind="GAIPBalickyKontrola.aspx.cs" Inherits="Gordic.Spi.WebClient.GAIPBalickyKontrola" %>

<%@ Register TagPrefix="gui" Namespace="Gordic.WebUI.Gui" Assembly="Gordic.WebUI.Gui" %>
<%@ Register TagPrefix="report" Namespace="Gordic.Report.WebClient" Assembly="Gordic.Report.WebClient" %>
<%@ OutputCache Location="None" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
	<script type="text/javascript">
	    function CMRow(event, ixb_aip,ixs_zup)
	    {	// Kontextove menu 
	        PopUp = createIPopup();
	        PopUp.addItem("jres:26285490", "Ssl/balik_detail", "DetailBaliku('" + ixs_zup + "');"); 
	        PopUp.addSeparator();
	        PopUp.addItem("jres:26285164", "gin/obcerstvit", "Obcerstvit();"); 
	        PopUp.popup(event, 155);
	    }
    </script>	    		
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Design" runat="server">
    <gui:GTabSettings ID="MasterPageSettings" runat="server" 
        ActionButtonsVisible="True"
        PageName="GAIPBalickyKontrolaControl" 
        OkVisible="False" 
        CancelVisible="False"
        HelpTopicId="GAIPBalickyKontrolaControl"
        FilterContentPlaceHolderHeight="60"
        ContentPadding="false"
        EnablePageMethods="true" 
        WflScript="true"
        SslScript="true" 
        CanSubmitBeforeLoad="false"
        >  
        
        <Services>
            <asp:ServiceReference Path="~/Gin/Wfl/WS/WSOperationWfl.asmx" />
        </Services>

	</gui:GTabSettings> 
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="Filter" runat="server">
    <gor:GFromToDate id="m_oFromToDate" Top="0px"  Left="220px" Js="true" Required="false" LabelWidth="50" runat="server" /> 
	<gor:GRadioButtonList id="m_oRadioTypSeznamu" Top="20px" Left="10px" BorderWidth="1px" runat="server" RepeatColumns="2"	
		RepeatDirection="Horizontal" Width="200px" AutoPostBack="true" onselectedindexchanged="LoadData">				
        <asp:ListItem Text="gres:26285494" Value="A"></asp:ListItem>
        <asp:ListItem Text="gres:26285495" Value="B"></asp:ListItem>
	</gor:GRadioButtonList>  

    <gor:GRadioButtonList id="m_oRadioTypSeznamuChyby" Top="5px" Left="420px" BorderWidth="1px" runat="server"	
		RepeatDirection="Vertical" Width="150px" AutoPostBack="true" onselectedindexchanged="LoadData">				
        <asp:ListItem Text="gres:26285587" Value="A"></asp:ListItem>
        <asp:ListItem Text="gres:26285588" Value="B" Selected="True"></asp:ListItem>
	</gor:GRadioButtonList> 
</asp:Content>