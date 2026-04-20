<%@ MasterType TypeName="Gordic.WebUI.Gui.GTab" %>
<%@ Page Title="VypujckaZeSpisovny" MasterPageFile="~/Gin/MasterPages/GTab/GTab.Master" language="c#" Codebehind="VypujckaZeSpisovny.aspx.cs" AutoEventWireup="True" Inherits="Gordic.Spi.WebClient.VypujckaZeSpisovny" %>

<%@ OutputCache Location="None" %>
<%@ Register TagPrefix="ginwc" Namespace="Gordic.Gin.WebClient" Assembly="Gordic.Gin.WebClient" %>
 
<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
	<script type="text/javascript">
	    function VypujckaZeSpisovny_OnCancelClick()
	    {
	        window.close(false);
	    }

	    //------------------------------------------------------------------------------
	    // Funkce pridani odresata potvrzeni				
	    function EsuPrirad()  
	    {
	        var oReturn = OtevriESUZastupneOsoby();
	        if ( oReturn != null )
	        { 
	            if ( oReturn.values.length == 2 )
	            {
	                m_oEsu_TextBox.value = oReturn.values[1];
	                m_oIxsEsu.value = oReturn.values[0];
	                m_oEsuZO_TextBox.value = ""; 
	                //var porZast = "0";
	                //var licZast = "";
	                //debugger;
	                //var l_esuInfo1 = Gordic.Esu.WebClient.WSOperationsESU.GetEsuInfo(m_oIxsEsu.value + "," + porZast + "," + licZast);
	                //debugger;
	            }
	            else
	            {
	                m_oEsu_TextBox.value = oReturn.values[2];
	                m_oIxsEsu.value = oReturn.values[0] + "," + oReturn.values[1] + "," + oReturn.values[4];
	                m_oEsuZO_TextBox.value = oReturn.values[3];
	                //debugger;
	                //var l_esuInfo = Gordic.Esu.WebClient.WSOperationsESU.GetEsuInfo(m_oIxsEsu.value + "," + oReturn.values[1] + "," + oReturn.values[4]);
	                //debugger;
	            }
	            GinisEvent('NactiEmailEsu');
	        }
	    }
    </script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="Design" runat="server">
    <gor:GTabSettings ID="MasterPageSettings" runat="server" 
        PageName="VypujckaZeSpisovny"
        HelpTopicId="VypujckaZeSpisovny"
        ActionButtonsVisible="true"
        OkVisible="true" 
        CancelVisible="true"
        FilterContentPlaceHolderHeight="0"
        EnablePageMethods="false"
		ContentPadding = "true" 
		EsuScript="true"
		WflScript="true"
        CanSubmitBeforeLoad="false"> 
    </gor:GTabSettings>
</asp:Content>
 
<asp:Content ID="Content3" runat="server" ContentPlaceHolderID="Main">
    <gor:GLabel id="m_oTitle"  Text="gres:26285307" Top="0px" Left="0px" runat="server" Font-Bold="true"></gor:GLabel>
    <gor:GImage ID="m_oImage" Top="0px" Right="5px" ImageUrl="" runat="server"></gor:GImage> 	
    <gor:GRadioButtonList id="m_oRadioList" RepeatDirection="Horizontal" AutoPostBack="true" onselectedindexchanged="ZmenaSubjektu" BorderWidth="1" Top="15px" Left="0px" runat="server" Width="250px" CellPadding="0" CellSpacing="3" >
		<asp:ListItem Value="Int" Text="gres:26285305" Selected="True" ></asp:ListItem>
		<asp:ListItem Value="Ext" Text="gres:26285306" Selected="True" ></asp:ListItem>
	</gor:GRadioButtonList>  
    <ginwc:GSUFunctionReferentExt  id="m_oSUFuncRefVlastnik" Top="50px" Left="0px" Orientation="SemiVertical" TextBoxesWidth="132" LabelWidth="145" Js="true" runat="server" />    
	<gor:GStringInput id="m_oEsu" Top="90px" Left="0px" LabelWidth="170" Orientation="SemiVertical" style=" cursor: Pointer" runat="server" TextBoxWidth="262" LabelText="gres:26285309" JS="true"/>
	<gor:GFunctionButton id="m_oEsuButton" Top="104px" Left="272px"  ButtonFunction="MoreOptions" OnClientClick="EsuPrirad();return false;" runat="server"/>
	<gor:gstringinput id="m_oEsuZO" Top="104px" Left="290px" style="cursor: Pointer" runat="server" ReadOnly="True" TextBoxWidth="172" LabelVisible="False" Js="true"/>
	<gor:GStringInput id="tbDuvod" Top="130px" Left="110px" runat="server" Orientation="SemiVertical" TextBoxWidth="352" LabelText="Dùvod" Js="true"/>

    <gor:GCheckBox id="chbDnldBalicek" Top="20px" Left="300px" Width="120px" Checked="False" Visible="False" runat="server" Text="gres:26285585"/>

    <gor:gdateinput id="m_oDatumVraceni" Top="130px" Left="0px" runat="server" LabelText="gres:26285295"  HorizontalOrientation="True" LabelWidth="80" TextBoxWidth="70"/>
	<gor:GHiddenField ID="m_oIxsEsu" runat="server" />

    <gor:GCheckBox id="chbOdeslatMailem" Top="185px" Left="20px" Width="120px" Checked="False" Visible="true" runat="server" Text="gres:26285592"/>
    <gor:GStringInput id="m_oMail" Top="170px" Left="140px" LabelWidth="110" Orientation="SemiVertical" runat="server" TextBoxWidth="262" LabelText="gres:26285593" JS="true"/>

</asp:Content>
