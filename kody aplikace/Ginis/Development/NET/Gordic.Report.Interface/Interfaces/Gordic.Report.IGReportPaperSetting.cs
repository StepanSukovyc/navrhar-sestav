//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.IGReportPaperSetting.cs       </Name>
//    <Description> Interface pro zjišování nastavení stránek  </Description>
//    <Author>      Jan Brabec, Martin Aliger                   </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2005  </Copyright>
//    <Created>     2003-08-25                                  </Created>
//  </FileHeader>
// 2005-09-26  Martin Aliger prevezmuto

using System;

namespace Gordic.Report.Interface
{
	/// <summary>
	/// Interface pro zjišování nastavení rozmìrù stránky z tiskovıch pøedvoleb
	/// prohlíeèe
	/// <remarks>
	/// Pokud jde o tlustého klienta, velikosti stránek se vyberou na 
	/// základì pøedvoleb prohlíeèe, v pøípadì lehkého klienta na základì
	/// napevno nastavenıch pøedvoleb
	/// </remarks>
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportPaperSetting 
	{
		/// <summary>
		/// Detekce pøedvolby tisku
		/// </summary>
		/// <remarks>
		/// Pøedvolba tisku se zjistí z prohlíeèe v pøípadì tlustého klienta, nebo
		/// z defaultního nastavení v pøípadì lehkého klienta
		/// </remarks>
		/// <param name="key">Identifikaèní klíè pøedvolby</param>
		/// <param name="pageLen">Poadovaná délka stránky v poètu øádek, vrací skuteènou délku stránky</param>
		/// <param name="pageWidth">Poadovaná šíøka øádky ve znacích, vrací skuteènou šíøku stránky</param>
		/// <param name="formatName">Vrací název vybrané pøedvolby</param>
		void DetectFormat(string key, ref int pageLen, ref int pageWidth, out string formatName);
	}

	/// <summary>
	/// Pouze pro interní pouití
	/// </summary>
    [System.Security.SecurityCritical]
	public delegate void DetectFormatHandler(IGReport report, string key, ref int pageLen, ref int pageWidth, out string formatName);

	/// <summary>
	/// Pouze pro interní pouití
	/// </summary>
    [System.Security.SecurityCritical]
	public interface IGReportDetectFormat
	{
		/// <summary>
		/// Pouze pro interní pouití
		/// </summary>
		event DetectFormatHandler DetectFormatImplementation;
	}
}
