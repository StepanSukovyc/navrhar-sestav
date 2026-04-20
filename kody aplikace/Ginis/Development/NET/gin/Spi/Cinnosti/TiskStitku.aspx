<%@ MasterType TypeName="Gordic.WebUI.Gui.GTab" %>
<%@ Page Title="TiskStitku" MasterPageFile="~/Gin/MasterPages/GTab/GTab.Master" Language="C#" AutoEventWireup="true" CodeBehind="TiskStitku.aspx.cs" Inherits="Gordic.Spi.WebClient.TiskStitku" %>

<%@ Register TagPrefix="gui" Namespace="Gordic.WebUI.Gui" Assembly="Gordic.WebUI.Gui" %>
<%@ Register TagPrefix="report" Namespace="Gordic.Report.WebClient" Assembly="Gordic.Report.WebClient" %>
<%@ OutputCache Location="None" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
    <script type="text/javascript">
         var m_oTiskStitkuButtonCID = "<%=m_oTiskStitkuButton.ClientID %>";
    
         function TiskStitku() {				
			document.getElementById(m_oTiskStitkuButtonCID).click();
		 }

		 function TiskStitku_OnCancelClick()
         {
             window.close();
             return false;
         }
    </script>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="Design" runat="server">
    <gui:GTabSettings ID="MasterPageSettings" runat="server" 
        ActionButtonsVisible="true"
        PageName="TiskStitku" 
        OkVisible="false" 
        CancelVisible="true"
        HelpTopicId="TiskStitku"
        FilterContentPlaceHolderHeight="0"
        EnablePageMethods="false"> 

        <!-- tlacitka po prave strane -->
        <ActionButtons>
			<gor:GActionButton runat="server" ID="m_oOKButton" Text="gres:26285123" UseSubmitBehavior="false" OnClientClick="TiskStitku();return false;"/>
        </ActionButtons>
        
	</gui:GTabSettings>
</asp:Content>

<asp:Content ID="Content3" runat="server" ContentPlaceHolderID="Main">
        <gor:GDiv ID="MainGDiv" runat="server" Top="5" >
			<table cellSpacing="1" cellPadding="1">
				<tr>
					<td colspan="2">
					    <gor:gintegerinput id="m_oOdStitku" runat="server" Required="True" TextBoxWidth="80" LabelWidth="60" LabelText="Od štítku" MaximumValue="30"
                            RequiredErrorMessage="Zadejte hodnotu Od štítku" CustomErrorMessage="Zadejte správnou hodnotu Od štítku" MinimumValue="1" MaximumLength="10" />
				    </td>
				</tr>
                <tr>
					<td colspan="2">
                        <gor:GCheckBox id="m_oVsechnyKrabiceCheckbox" Runat="server" Text="Tisknout štítky pro všechny krabice" />
                    </td>
				</tr>
			</table>
		</gor:GDiv>
        			
        <report:gprintbuttonweb id="m_oTiskStitkuButton" Width="0" Height="0" runat="server" CssClass="ButtonFace" ShowModalReport="true" />

</asp:Content>