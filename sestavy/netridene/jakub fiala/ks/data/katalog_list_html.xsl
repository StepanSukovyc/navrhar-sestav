<?xml version="1.0" encoding="windows-1250"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:d="data:KL00001:1:1" xmlns="http://www.w3.org/1999/xhtml">
	<xsl:output method="html" />
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:d="data:KL00001:1:1">
			<body>
				<div class="modulHeader clearfix" >
					<img alt="Logo - Název produktu " src="modul.png" />
					<h1>
						<xsl:apply-templates select="/d:HLA/d:ISSUE/d:summary" />
					</h1>
				</div>
				<div class="perex">
					<xsl:apply-templates select="/d:HLA/d:ISSUE/d:zsc_shrnuti" />
				</div>
				<div class="clearfix">
					<div class="vyhodyBlokLeft">
						<xsl:for-each select="/d:HLA/d:ISSUE/d:PRINOSY">
							<div class="vyhoda">
								<xsl:apply-templates />
							</div>
						</xsl:for-each>
					</div>
					<div class="galleryRight">
						<div class="image">
							<img alt="Obrázek aplikace" src="http://gordic.bluehosting.cz/getattachment/1b6d193a-2780-4258-8af8-bc8553143e27/sliderImage?maxsidesize=250" />
						</div>
						<a class="showGallery"/>
						<a class="fancybox" data-fancybox-type="image" href="http://gordic.bluehosting.cz/getattachment/1b6d193a-2780-4258-8af8-bc8553143e27/" title="Sed pretium ligula sit amet sem euismod." rel="gall"/>
						<a class="fancybox" data-fancybox-type="image" href="http://gordic.bluehosting.cz/getattachment/1b6d193a-2780-4258-8af8-bc8553143e27/" title="Praesent et placerat urna." rel="gall"/>
						<a class="fancybox" data-fancybox-type="image" href="http://gordic.bluehosting.cz/getattachment/1b6d193a-2780-4258-8af8-bc8553143e27/" title="Donec tincidunt, lacus vel pulvinar luctus, leo sem lacinia justo." rel="gall"/>
						<a class="fancybox" data-fancybox-type="image" href="http://gordic.bluehosting.cz/getattachment/1b6d193a-2780-4258-8af8-bc8553143e27/" title="Sed pretium ligula sit amet sem euismod, nec tristique diam consectetur." rel="gall"/>
						<a class="fancybox" data-fancybox-type="image" href="http://gordic.bluehosting.cz/getattachment/1b6d193a-2780-4258-8af8-bc8553143e27/" title="Praesent et placerat urna. Proin massa orci" rel="gall"/>
					</div>
				</div>
				<h2>Popis produktu</h2>
				<div class="desc">
					<xsl:apply-templates select="/d:HLA/d:ISSUE/d:description" />
				</div>
				
				<div class="edice clearfix">
					<div class="ediceHeader">
						<h3>Klíčové vlastnosti</h3>
						<div class="buttonSlide"></div>
					</div>
					<div class="more clearfix">
						<div class="desc">
							<xsl:for-each select="/d:HLA/d:ISSUE/d:VYHODY">
								<div class="vyhoda"><xsl:apply-templates /></div>
							</xsl:for-each>
						</div>
					</div>
				</div>
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