<?xml version="1.0" encoding="windows-1250"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:d="data:KL00001:1:1"
                xmlns="http://www.w3.org/1999/xhtml"
>
	<xsl:output method="html" />
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:d="data:KL00001:1:1">
			<body>
				<table width="60%">
					<tr>
						<td width="50%" style="text-align:right;">
							<img src="bitmap\obr_1.png" alt="logo GORDIC spol. s r.o." width="355" height="126"/>
						</td>
						<td width="50%" style="font-family:'Courier New'; font-size:18pt; font-style:normal;text-align: left;">Informační systémy pro státní správu, samosprávu a bankovnictví</td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<div style="font-family:Arial;font-size:40pt;color:darkblue; margin-bottom:30px">
								<b><xsl:apply-templates select="/d:HLA/d:ISSUE/d:summary" /></b>
								<img alt="" src="bitmap\obr_3.png" width="133" height="133" style="margin-left:40px" />
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<div align="center">
								<img src="bitmap\obr_2.png" alt="ukázka" width="723" height="376"/>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<div style="width:50%; text-align:center; font-family:Arial;font-size:32pt;color:darkblue;margin-top:40px;margin-bottom:50px">
								<xsl:apply-templates select="/d:HLA/d:ISSUE/d:zsc_slogan" />
							</div>
						</td>
					</tr>
					<tr>
						<td align="center" colspan="2">
							<div>
								<img src="bitmap\obr_4.png" alt="ukázka" width="150" height="150"/>
								<br />
								<a href="http://www.gordic.cz" style="font-family:Arial;text-decoration: none;color:darkblue;" >www.gordic.cz</a>
							</div>
						</td>
					</tr>
				</table>
				<table width="60%">
					<tr>
						<td colspan="2" align="right">
							<img src="bitmap\obr_5.png" alt="ukázka" width="197" height="70" style="margin-right:50px"/>
						</td>
					</tr>
					<tr>
						<td colspan="2" align="center">
							<table>
								<tr>
									<td>
										<img alt="" src="bitmap\obr_3.png" width="75" height="75" style="margin-left:40px;margin-right:40px;" />
									</td>
									<td valign="middle">
										<div style="font-family:Arial;font-size:30pt;color:darkblue; ">
											<xsl:apply-templates select="/d:HLA/d:ISSUE/d:summary" />
										</div>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td width="50%">
							<div style="font-family:Arial;font-size:14pt;text-align:justify;margin-left:50px;margin-right:50px">
								<b>
									<i><xsl:apply-templates select="/d:HLA/d:ISSUE/d:zsc_shrnuti" /></i>
								</b>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="2" align="left">
							<table>
								<tr>
									<td>
										<img alt="" src="bitmap\obr_6.png" width="90" height="90" style="margin-left:40px;margin-right:40px;" />
									</td>
									<td valign="middle">
										<div style="font-family:Arial;font-size:24pt;">
										Přínosy produktu
										</div>
									</td>
								</tr>
								<tr>
									<td/>
									<td align="left">
										<xsl:for-each select="/d:HLA/d:ISSUE/d:PRINOSY">
											<li>
												<xsl:apply-templates />
											</li>
										</xsl:for-each>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td colspan="2" align="left">
							<table>
								<tr>
									<td>
										<img alt="" src="bitmap\obr_7.png" width="90" height="90" style="margin-left:40px;margin-right:40px;" />
									</td>
									<td valign="middle">
										<div style="font-family:Arial;font-size:24pt;">
										Klíčové vlastnosti produktu
										</div>
									</td>
								</tr>
								<tr>
									<td />
									<td align="left">
										<ul>
											<xsl:for-each select="/d:HLA/d:ISSUE/d:VYHODY">
												<li>
													<xsl:apply-templates />
												</li>
											</xsl:for-each>
										</ul>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			
			</body>
		</html>
	
	</xsl:template>
	<xsl:template match="/d:HLA/d:ISSUE/d:summary">
		<xsl:apply-templates />
	</xsl:template>
	<xsl:template match="/d:HLA/d:ISSUE/d:zsc_shrnuti">
		<xsl:apply-templates />
	</xsl:template>
	<xsl:template match="/d:HLA/d:ISSUE/d:zsc_slogan">
		<xsl:apply-templates />
	</xsl:template>
</xsl:stylesheet>