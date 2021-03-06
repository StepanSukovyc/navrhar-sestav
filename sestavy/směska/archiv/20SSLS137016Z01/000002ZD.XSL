<?xml version="1.0" encoding="windows-1250"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
	xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-1.0" 
		 xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-1.0" 
		 xmlns:cur="urn:oasis:names:specification:ubl:schema:xsd:CurrencyCode-1.0" 
		 xmlns:oas="urn:oasis:names:specification:ubl:schema:xsd:Invoice-1.0"
		 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		 xmlns:mi="urn:micr:names:specification:ubl:schema:xsd:InvoiceExt-1.0" 
		 xsi:schemaLocation="urn:micr:names:specification:ubl:schema:xsd:InvoiceExt-1.0 c:\micr.xsd"
		 xmlns:ms="urn:schemas-microsoft-com:xslt"
		 xmlns:dyn="http://www.gordic.cz/TR0443/xslt-scripts"
                 xmlns:gor="http://www.gordic.cz/TR0443/alvroz32"
         extension-element-prefixes="dyn ms">
	
	 <gor:info ixs_alv="0000ALV02ZDY"/>
	
	<ms:script implements-prefix="dyn" language="jscript">
		function formatdate(date)
		{
			var d = date;
			var y = d.substr(0,4);
			var m = d.substr(5,2);
			var a = d.substr(8,2);
			return ''+y+m+a+'000000';
		}
	</ms:script>
	
	<xsl:output method="text" encoding="windows-1250" standalone="yes" indent="no" omit-xml-declaration="yes"/>
		 
	<xsl:template match="/">
		<xsl:text>ixs_xme|0000ALX0AE7X|1|1|</xsl:text>
		<xsl:text>&#10;</xsl:text>		
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="mi:Invoice">
		<xsl:text>FAKTURA|</xsl:text>

		<!--item name="ID" title="��slo faktury"/-->
		<xsl:value-of select="oas:ID"/><xsl:text>|</xsl:text>
		<!--item name="GUID" title="Jednozna�n� identifik�tor faktury (p��padu)"/-->
		<xsl:value-of select="oas:GUID"/><xsl:text>|</xsl:text>
		<!--item name="IssueDate" title="Datum vystaven� dokladu"/-->
		<xsl:value-of select="dyn:formatdate(string(cbc:IssueDate))"/><xsl:text>|</xsl:text>
		<!--item name="TaxPointDate" title="Datum uskute�n�n� zdaniteln�ho pln�n�" /-->
		<xsl:value-of select="dyn:formatdate(string(oas:TaxPointDate))"/><xsl:text>|</xsl:text>

		<!--item name="OrderBuyersID" title="ID objedn�vky v odb�ratelsk�m IS" /-->
		<xsl:value-of select="cac:OrderReference/cac:BuyersID"/><xsl:text>|</xsl:text>
		<!--item name="OrderIssueDate" title="Datum vystaven� objedn�vky" /-->
		<xsl:value-of select="dyn:formatdate(string(cac:OrderReference/cbc:IssueDate))"/><xsl:text>|</xsl:text>
		
		<!--item name="ODB_ICO"  title="Odb�ratel - identifika�n� ��slo" /-->
		<xsl:value-of select="cac:BuyerParty/cac:Party/cac:PartyIdentification/cac:ID"/><xsl:text>|</xsl:text>
		<!--item name="ODB_NAME" title="Odb�ratel - N�zev oganizace" /-->
		<xsl:value-of select="cac:BuyerParty/cac:Party/cac:PartyName/cbc:Name"/><xsl:text>|</xsl:text>
		<!--item name="ODB_ULI"  title="Odb�ratel - ulice" /-->
		<xsl:value-of select="concat(cac:BuyerParty/cac:Party/cac:Address/cbc:StreetName,' ',cac:BuyerParty/cac:Party/cac:Address/cbc:BuildingNumber)"/><xsl:text>|</xsl:text>
		<!--item name="ODB_MES"  title="Odb�ratel - m�sto" /-->
		<xsl:value-of select="cac:BuyerParty/cac:Party/cac:Address/cbc:CityName"/><xsl:text>|</xsl:text>
		<!--item name="ODB_PSC"  title="Odb�ratel - PS�" /-->
		<xsl:value-of select="cac:BuyerParty/cac:Party/cac:Address/cbc:PostalZone"/><xsl:text>|</xsl:text>
		<!--item name="ODB_STAT" title="Odb�ratel - st�t" /-->		
		<xsl:value-of select="cac:BuyerParty/cac:Party/cac:Address/cbc:CountrySubentityCode"/><xsl:text>|</xsl:text>
		<!--item name="ODB_DIC"  title="Odb�ratel - DI�" /-->
		<xsl:value-of select="cac:BuyerParty/cac:Party/cac:PartyTaxScheme/cac:CompanyID"/><xsl:text>|</xsl:text>

		<!--item name="DOD_ICO"  title="Dodavatel - identifika�n� ��slo" /-->
		<xsl:value-of select="cac:SellerParty/cac:Party/cac:PartyIdentification/cac:ID"/><xsl:text>|</xsl:text>
		<!--item name="DOD_NAME" title="Dodavatel - N�zev oganizace" /-->
		<xsl:value-of select="cac:SellerParty/cac:Party/cac:PartyName/cbc:Name"/><xsl:text>|</xsl:text>
		<!--item name="DOD_ULI"  title="Dodavatel - ulice" /-->
		<xsl:value-of select="concat(cac:SellerParty/cac:Party/cac:Address/cbc:StreetName,' ',cac:SellerParty/cac:Party/cac:Address/cbc:BuildingNumber)"/><xsl:text>|</xsl:text>
		<!--item name="DOD_MES"  title="Dodavatel - m�sto" /-->
		<xsl:value-of select="cac:SellerParty/cac:Party/cac:Address/cbc:CityName"/><xsl:text>|</xsl:text>
		<!--item name="DOD_PSC"  title="Dodavatel - PS�" /-->
		<xsl:value-of select="cac:SellerParty/cac:Party/cac:Address/cbc:PostalZone"/><xsl:text>|</xsl:text>
		<!--item name="DOD_STAT" title="Dodavatel - st�t" /-->		
		<xsl:value-of select="cac:SellerParty/cac:Party/cac:Address/cbc:CountrySubentityCode"/><xsl:text>|</xsl:text>
		<!--item name="DOD_DIC"  title="Dodavatel - DI�" /-->
		<xsl:value-of select="cac:SellerParty/cac:Party/cac:PartyTaxScheme/cac:CompanyID"/><xsl:text>|</xsl:text>
		
		<!--item name="DOD_REF_NAME" title="Dodavatel - zastoupen - jm�no" /-->
		<xsl:value-of select="cac:SellerParty/cac:AccountsContact/cbc:Name"/><xsl:text>|</xsl:text>
		<!--item name="DOD_REF_TEL"  title="Dodavatel - zastoupen - telefon" /-->
		<xsl:value-of select="cac:SellerParty/cac:AccountsContact/cbc:Telephone"/><xsl:text>|</xsl:text>
		<!--item name="DOD_REF_MAIL" title="Dodavatel - zastoupen - el. po�ta" /-->
		<xsl:value-of select="cac:SellerParty/cac:AccountsContact/cbc:ElectronicMail"/><xsl:text>|</xsl:text>


		<!--item name="PRI_ICO"  title="P��jemce - identifika�n� ��slo" /-->
		<xsl:value-of select="mi:RecipientParty/cac:Party/cac:PartyIdentification/cac:ID"/><xsl:text>|</xsl:text>
		<!--item name="PRI_NAME" title="P��jemce - N�zev oganizace" /-->
		<xsl:value-of select="mi:RecipientParty/cac:Party/cac:PartyName/cbc:Name"/><xsl:text>|</xsl:text>
		<!--item name="PRI_ULI"  title="P��jemce - ulice" /-->
		<xsl:value-of select="concat(mi:RecipientParty/cac:Party/cac:Address/cbc:StreetName,' ',mi:RecipientParty/cac:Party/cac:Address/cbc:BuildingNumber)"/><xsl:text>|</xsl:text>
		<!--item name="PRI_MES"  title="P��jemce -mi:RecipientParty m�sto" /-->
		<xsl:value-of select="mi:RecipientParty/cac:Party/cac:Address/cbc:CityName"/><xsl:text>|</xsl:text>
		<!--item name="PRI_PSC"  title="P��jemce - PS�" /-->
		<xsl:value-of select="mi:RecipientParty/cac:Party/cac:Address/cbc:PostalZone"/><xsl:text>|</xsl:text>
		<!--item name="PRI_STAT" title="P��jemce - st�t" /-->		
		<xsl:value-of select="mi:RecipientParty/cac:Party/cac:Address/cbc:CountrySubentityCode"/><xsl:text>|</xsl:text>
		<!--item name="PRI_DIC"  title="P��jemce - DI�" /-->
		<xsl:value-of select="mi:RecipientParty/cac:Party/cac:PartyTaxScheme/cac:CompanyID"/><xsl:text>|</xsl:text>

		<!--item name="URC_ICO"  title="M�sto ur�en� - identifika�n� ��slo" /-->
		<xsl:value-of select="mi:Delivery/cac:Party/cac:PartyIdentification/cac:ID"/><xsl:text>|</xsl:text>
		<!--item name="URC_NAME" title="M�sto ur�en� - N�zev oganizace" /-->
		<xsl:value-of select="mi:Delivery/cac:Party/cac:PartyName/cbc:Name"/><xsl:text>|</xsl:text>
		<!--item name="URC_ULI"  title="M�sto ur�en� - ulice" /-->
		<xsl:value-of select="concat(mi:Delivery/cac:Party/cac:Address/cbc:StreetName,' ',mi:Delivery/cac:Party/cac:Address/cbc:BuildingNumber)"/><xsl:text>|</xsl:text>
		<!--item name="URC_MES"  title="M�sto ur�en� - m�sto" /-->
		<xsl:value-of select="mi:Delivery/cac:Party/cac:Address/cbc:CityName"/><xsl:text>|</xsl:text>
		<!--item name="URC_PSC"  title="M�sto ur�en� - PS�" /-->
		<xsl:value-of select="mi:Delivery/cac:Party/cac:Address/cbc:PostalZone"/><xsl:text>|</xsl:text>
		<!--item name="URC_STAT" title="M�sto ur�en� - st�t" /-->		
		<xsl:value-of select="mi:Delivery/cac:Party/cac:Address/cbc:CountrySubentityCode"/><xsl:text>|</xsl:text>
		<!--item name="URC_DIC"  title="M�sto ur�en� - DI�" /-->
		<xsl:value-of select="mi:Delivery/cac:Party/cac:PartyTaxScheme/cac:CompanyID"/><xsl:text>|</xsl:text>

		<!--item name="UCR_REF_NAME" title="Dodavatel - zastoupen - jm�no" /-->
		<xsl:value-of select="mi:Delivery/cac:AccountsContact/cbc:Name"/><xsl:text>|</xsl:text>
		<!--item name="UCR_REF_TEL"  title="Dodavatel - zastoupen - telefon" /-->
		<xsl:value-of select="mi:Delivery/cac:AccountsContact/cbc:Telephone"/><xsl:text>|</xsl:text>
		<!--item name="UCR_REF_MAIL" title="Dodavatel - zastoupen - el. po�ta" /-->
		<xsl:value-of select="mi:Delivery/cac:AccountsContact/cbc:ElectronicMail"/><xsl:text>|</xsl:text>
		
		<!--item name="TransactionDate" title="Datum ��etn�ho p��padu" /-->
		<xsl:value-of select="dyn:formatdate(string(mi:TransactionDate))"/><xsl:text>|</xsl:text>
		<!--item name="PaymentMeans" title="Zp�sob �hrady" /-->
		<xsl:call-template name="PaymentMeansCode">
        	<xsl:with-param name="code" select="mi:PaymentMeans/cac:PaymentMeansCode"/>
		</xsl:call-template>			
		<xsl:text>|</xsl:text>
		<!--item name="DuePaymentDate" title="Datum splatnosti" /-->
		<xsl:value-of select="dyn:formatdate(string(mi:PaymentMeans/cbc:DuePaymentDate))"/><xsl:text>|</xsl:text>
		<!--item name="PayeeFinancialAccount_ID" title="��slo ��tu" /-->
		<xsl:value-of select="mi:PaymentMeans/mi:PayeeFinancialAccount/cac:ID"/><xsl:text>|</xsl:text>
		<!--item name="PayeeFinancialAccount_NAME" title="N�zev banky" /-->
		<xsl:value-of select="mi:PaymentMeans/mi:PayeeFinancialAccount/mi:FinancialInstitution/cbc:Name"/><xsl:text>|</xsl:text>
		<!--item name="PayeeFinancialAccount_CODE" title="K�d banky" /-->
		<xsl:value-of select="mi:PaymentMeans/mi:PayeeFinancialAccount/mi:FinancialInstitution/mi:BankCode"/><xsl:text>|</xsl:text>
		<!--item name="PayeeFinancialAccount_IBAN" title="IBAN ��sla ��tu" /-->
		<xsl:value-of select="mi:PaymentMeans/mi:PayeeFinancialAccount/mi:FinancialInstitution/mi:IBAN"/><xsl:text>|</xsl:text>
		<!--item name="ConstantSymbol" title="Konstantn� symbol" /-->
		<xsl:value-of select="mi:PaymentMeans/mi:Payment/mi:ConstantSymbol"/><xsl:text>|</xsl:text>
		<!--item name="SpecificSymbol" title="Specifick� symbol" /-->
		<xsl:value-of select="mi:PaymentMeans/mi:Payment/mi:SpecificSymbol"/><xsl:text>|</xsl:text>
		<!--item name="PaidAmount" title="��stka k platb�" /-->
		<xsl:value-of select="mi:PaymentMeans/mi:Payment/cbc:PaidAmount"/><xsl:text>|</xsl:text>
		<!--item name="PaidAmount_CUR" title="M�na - ��stka k platb�" /-->
		<xsl:value-of select="mi:PaymentMeans/mi:Payment/cbc:PaidAmount/@amountCurrencyID"/><xsl:text>|</xsl:text>

		<!--item name="TaxExclusiveTotalAmount" title="Cena celkem bez DPH" /-->
		<xsl:value-of select="cac:LegalTotal/cbc:TaxExclusiveTotalAmount"/><xsl:text>|</xsl:text>
		<!--item name="TaxExclusiveTotalAmount_CUR" title="M�na - Cena celkem bez DPH" /-->
		<xsl:value-of select="cac:LegalTotal/cbc:TaxExclusiveTotalAmount/@amountCurrencyID"/><xsl:text>|</xsl:text>
		<!--item name="TaxInclusiveTotalAmount" title="Cena celkem v�etn� DPH" /-->
		<xsl:value-of select="cac:LegalTotal/cbc:TaxInclusiveTotalAmount"/><xsl:text>|</xsl:text>
		<!--item name="TaxInclusiveTotalAmount_CUR" title="M�na - Cena celkem v�etn� DPH" /-->
		<xsl:value-of select="cac:LegalTotal/cbc:TaxInclusiveTotalAmount/@amountCurrencyID"/><xsl:text>|</xsl:text>
		<!--item name="TotalTaxAmount" title="Suma v�ech dan� - p�es v�echny sazby" /-->
		<xsl:value-of select="mi:TaxTotal/cbc:TotalTaxAmount"/><xsl:text>|</xsl:text>
		<!--item name="TotalTaxAmount_CUR" title="M�na - Suma v�ech dan� - p�es v�echny sazby" /-->
		<xsl:value-of select="mi:TaxTotal/cbc:TotalTaxAmount/@amountCurrencyID"/><xsl:text>|</xsl:text>
		<!--item name="TaxInclusiveTotalAmountRounding" title="Zaokrouhlen� ��stky v�etn� dan�" /-->
		<xsl:value-of select="mi:LegalTotalRounding/mi:TaxInclusiveTotalAmountRounding"/><xsl:text>|</xsl:text>
		<!--item name="TaxInclusiveTotalAmountRounding_CUR" title="M�na - Zaokrouhlen� ��stky v�etn� dan�" /-->
		<xsl:value-of select="mi:LegalTotalRounding/mi:TaxInclusiveTotalAmountRounding/@amountCurrencyID"/><xsl:text>|</xsl:text>
		
		<xsl:text>&#10;</xsl:text>		
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="cac:InvoiceLine">
		<xsl:text>FAK_POL|</xsl:text>

		<!--item name="ID" title="Po�ad� polo�ky" /-->
		<xsl:value-of select="cac:ID"/><xsl:text>|</xsl:text>
		<!--item name="InvoicedQuantity" title="Mno�stv� zbo��" /-->
		<xsl:value-of select="cbc:InvoicedQuantity"/><xsl:text>|</xsl:text>
		<!--item name="InvoicedQuantity_UC" title="K�d mno�stv�" /-->
		<xsl:value-of select="cbc:InvoicedQuantity/@quantityUnitCode"/><xsl:text>|</xsl:text>
		<!--item name="LineExtensionAmount" title="Cena za polo�ku bez dan�" /-->
		<xsl:value-of select="cbc:LineExtensionAmount"/><xsl:text>|</xsl:text>
		<!--item name="LineExtensionAmount_CUR" title="M�na - Cena za polo�ku bez dan�" /-->
		<xsl:value-of select="cbc:LineExtensionAmount/@amountCurrencyID"/><xsl:text>|</xsl:text>
		<!--item name="Description" title="Popis zbo��" /-->
		<xsl:value-of select="cac:Item/cbc:Description"/><xsl:text>|</xsl:text>
		<!--item name="CatalogueItemIdentification" title="��rov� k�d podle dodavatele" /-->
		<xsl:value-of select="cac:Item/cac:CatalogueItemIdentification/cac:ID"/><xsl:text>|</xsl:text>
		<!--item name="SellersItemIdentification" title="Identifikace zbo�� podle dodavatele" /-->
		<xsl:value-of select="cac:Item/cac:SellersItemIdentification/cac:ID"/><xsl:text>|</xsl:text>
		<!--item name="PriceAmount" title="Cena za kus bez dan�" /-->
		<xsl:value-of select="cac:BasePrice/cbc:PriceAmount"/><xsl:text>|</xsl:text>
		<!--item name="PriceAmount_CUR" title="M�na - Cena za kus bez dan�" /-->
		<xsl:value-of select="cac:BasePrice/cbc:PriceAmount/@amountCurrencyID"/><xsl:text>|</xsl:text>
		<!--item name="TAX_ID" title="N�zev sazby dan�" /-->
		<xsl:value-of select="cac:Item/cac:TaxCategory/cac:ID"/><xsl:text>|</xsl:text>
		<!--item name="TAX_Percent" title="Sazba dan�" /-->
		<xsl:value-of select="cac:Item/cac:TaxCategory/cbc:Percent"/><xsl:text>|</xsl:text>
		
		<xsl:text>&#10;</xsl:text>		
		<xsl:apply-templates/>
	</xsl:template>
	

	<xsl:template match="mi:TaxTotal/mi:TaxSubTotal">
		<xsl:text>FAK_DAN|</xsl:text>

		<!--item name="TaxableAmount" title="Z�klad dan�" /-->
		<xsl:value-of select="cbc:TaxableAmount"/><xsl:text>|</xsl:text>
		<!--item name="TaxableAmount_CUR" title="M�na - Z�klad dan�" /-->
		<xsl:value-of select="cbc:TaxableAmount/@amountCurrencyID"/><xsl:text>|</xsl:text>
		<!--item name="TaxAmount" title="��stka dan� v sazb�" /-->
		<xsl:value-of select="cbc:TaxAmount"/><xsl:text>|</xsl:text>
		<!--item name="TaxAmount_CUR" title="M�na - ��stka dan� v sazb�" /-->
		<xsl:value-of select="cbc:TaxAmount/@amountCurrencyID"/><xsl:text>|</xsl:text>
		<!--item name="ID" title="N�zev sazby dan�" /-->
		<xsl:call-template name="TaxCode">
        	<xsl:with-param name="code" select="cac:TaxCategory/cac:ID"/>
		</xsl:call-template>			
		<xsl:text>|</xsl:text>
		
		<!--item name="Percent" title="Sazba dan�" /-->
		<xsl:value-of select="cac:TaxCategory/cbc:Percent"/><xsl:text>|</xsl:text>
		<!--item name="TaxInclusiveAmount" title="��stka v�etn� dan�" /-->
		<xsl:value-of select="mi:TaxInclusiveAmount"/><xsl:text>|</xsl:text>
		<!--item name="TaxInclusiveAmount_CUR" title="M�na - ��stka v�etn� dan�" /-->
		<xsl:value-of select="mi:TaxInclusiveAmount/@amountCurrencyID"/><xsl:text>|</xsl:text>
	
		<xsl:text>&#10;</xsl:text>		
		<xsl:apply-templates/>
	</xsl:template>

	<xsl:template match="text()">
	</xsl:template>

	<xsl:template name="PaymentMeansCode">
    	<xsl:param name="code"/>
		<xsl:choose>
			<xsl:when test="$code = 42">P��kazem k �hrad�</xsl:when>
			<xsl:otherwise>Neur�eno (<xsl:value-of select="$code"/>)</xsl:otherwise>
		</xsl:choose>		
	</xsl:template>

	<xsl:template name="TaxCode">
    	<xsl:param name="code"/>
		<xsl:choose>
			<xsl:when test="$code = 'Standard Rate'">Z�kladn� sazba</xsl:when>
			<xsl:otherwise><xsl:value-of select="$code"/></xsl:otherwise>
		</xsl:choose>		
	</xsl:template>
	
</xsl:stylesheet>

