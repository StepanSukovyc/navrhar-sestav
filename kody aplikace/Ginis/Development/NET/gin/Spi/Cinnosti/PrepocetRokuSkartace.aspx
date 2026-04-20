<%@ MasterType TypeName="Gordic.WebUI.Gui.GTab" %>
<%@ Page Title="PrepocetRokuSkartace" MasterPageFile="~/Gin/MasterPages/GTab/GTab.Master" Language="C#" AutoEventWireup="true" CodeBehind="PrepocetRokuSkartace.aspx.cs" Inherits="Gordic.Spi.WebClient.PrepocetRokuSkartace" %>

<%@ Register TagPrefix="gui" Namespace="Gordic.WebUI.Gui" Assembly="Gordic.WebUI.Gui" %>
<%@ OutputCache Location="None" %>

<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
	<script type="text/javascript">
	    var m_sNevybraliJsteRadekErrText = "jres:26285166"; // 26285166 : Nevybrali jste žádný øádek
	    
	    var HiddenIdClientId = "<%=m_oIdHidden.ClientID %>";
	    var m_oPrepocitatButtonCID = "<%=m_oPrepocitatButton.ClientID %>";
	    
	    var SSLListsIXP = "";
	    
	    function DetailBaliku(ixp)
		{			
		    Spi_OtevriDetailBaliku(0, "?Id=" + ixp);
		}
	    function GetSelectedRows()
		{
			if(m_oPagingGrid != null) {
	          if(m_oPagingGrid.checked.length != 0) {
				var i;					
				SSLListsIXP = "";						
				for(i=0;i < m_oPagingGrid.checked.length;i++) {
					if(i == 0) {
						SSLListsIXP = SSLListsIXP + m_oPagingGrid.checked[i];
					} else {
					    SSLListsIXP = SSLListsIXP + "," + m_oPagingGrid.checked[i];
					}
				}	
			  }	
			}								
		}	
	    function PrepocitatRokSkartace() {
		    GetSelectedRows();
		    
		    if(SSLListsIXP != "") {
                var textboxId = document.getElementById(HiddenIdClientId);	
			    textboxId.value = SSLListsIXP;

			    var button = document.getElementById(m_oPrepocitatButtonCID);
		        button.click();
			} else {
			    window.alert(m_sNevybraliJsteRadekErrText);	
			}
		}
	    function PrepocetRokuSkartace_OnCancelClick()
        {
            window.close();
            return false;
        }
	</script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Design" runat="server">
    <gui:GTabSettings ID="MasterPageSettings" runat="server" 
        ActionButtonsVisible="true"
        PageName="PrepocetRokuSkartace"
        OkVisible="false" 
        CancelVisible="true"
        HelpTopicId="PrepocetRokuSkartace"
        FilterContentPlaceHolderHeight="0"
        ContentPadding="false"
        EnablePageMethods="false"
        WflScript="true"
        > 

        <!-- tlacitka po prave strane -->
        <ActionButtons>
			<gor:GActionButton runat="server" ID="m_oPrepocitatClientButton" Text="gres:26285169" UseSubmitBehavior="false" OnClientClick="PrepocitatRokSkartace();return false;"/>
        </ActionButtons>
        
	</gui:GTabSettings>
</asp:Content>

<asp:Content ID="Content3" runat="server" ContentPlaceHolderID="Main">
    <gor:GDiv ID="MainGDiv" runat="server">
	    <gor:GDiv ID="DataGridGDiv" runat="server" >
			<gor:GPagingDataGrid runat="server" id="m_oPagingGrid" SelectRowOnClick="false" Border="false" FixedLayout="false" Js="true" />
        </gor:GDiv>
	</gor:GDiv>	
	
	<asp:textbox id="m_oIdHidden" style="left:0px; display:none; position:absolute; top:0px;" Runat="server" />
	<asp:Button cssclass="ButtonFace" id="m_oPrepocitatButton" Runat="server" style="z-index:102;left:0px;display:none;position:absolute;top:0px;" OnClick="m_oPrepocitatButton_Click" />
		
</asp:Content>