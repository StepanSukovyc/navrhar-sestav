//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TemplateStringTagProvider.cs           </Name>
//    <Description> konvertor štítků šablon                                     </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-11                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.StructureView;

namespace Gordic.GFE.WinClient.Commands
{
    /// <summary>
    /// konvertor štítků šablon
    /// </summary>
    class TemplateStringTagProvider : IStringTagProvider
    {
        readonly static string[] tags = new string[] 
        {
			"SsrReportXmlns", "AlfReportXmlns",
            "Struct_FileName", "Struct_IXS_XME", "CurDataFileName",
            "DataXSI", "DataXSD",
            "Struct_RootRegName",
            "Struct_VersionMajor", "Struct_VersionMinor",
            "Struct_IXS_ALV", "Struct_Allowed_Output",
            "Struct_Maker", "Struct_Filtr_Frm",
            "RD_APPLICATIONNAME", "RD_MAINVERSION"
		};

        /// <summary>
        /// seznam dostupných štítků poskytovatele
        /// </summary>
        public string[] Tags { get { return tags; } }

        StructureViewEntry GetCurrentStructure()
        {
            return StructureViewPad.Instance.ActiveItem != null ? StructureViewPad.Instance.ActiveItem : null;
        }
        /// <summary>
        /// Konverze štítku/zkrátky na hodnotu
        /// </summary>
        /// <param name="tag">Štítek</param>
        /// <returns>Konvertovaná hodnota</returns>
        public string Convert(string tag)
        {
            StructureViewEntry entry = null;
            switch (tag.ToUpperInvariant())
            {
                case "RD_APPLICATIONNAME":
                    try { return ReportDesignerMain.Current.GetApplicationTitle(ReportDesignerMain.Current.ApplicationInfo.Name.BaseValue); }
                    catch { return RevisionClass.ApplicationName; }
                case "RD_MAINVERSION":
                    return RevisionClass.MainVersion;
                case "STRUCT_FILENAME":
                    entry = GetCurrentStructure();
                    return entry == null ? null : entry.FileName;
                case "STRUCT_IXS_XME":
                    entry = GetCurrentStructure();
                    return entry == null ? null : entry.StructureID;
                case "STRUCT_ROOTREGNAME":
                    return GetCurrentStructureRootName();
                case "CURDATAFILENAME":
                    return ":GENERATE:";
                case "STRUCT_VERSIONMINOR":
                    entry = GetCurrentStructure();
                    return entry == null || entry.Structure == null ? null : entry.Structure.StructureVersionMinor.ToString();
                case "STRUCT_VERSIONMAJOR":
                    entry = GetCurrentStructure();
                    return entry == null || entry.Structure == null ? null : entry.Structure.StructureVersionMajor.ToString();
                case "DATAXSD":
                    return @"http://www.w3.org/2001/XMLSchema";
                case "DATAXSI":
                    return @"http://www.w3.org/2001/XMLSchema-instance";
                case "SSRREPORTXMLNS":
                    return ReportDesignerProperties.Instance.SsrReportXmlns;
                case "ALFREPORTXMLNS":
                    return ReportDesignerProperties.Instance.AlfReportXmlns;
            }
            return String.Empty;
        }

        private string GetCurrentStructureRootName()
        {
            StructureViewEntry entry = GetCurrentStructure();
            if (entry == null 
                || entry.Structure == null 
                || entry.Structure.Root == null 
                || entry.Structure.Root.Children.Count == 0)
                return null;

            return entry.Structure.Root.Children.First().Name;
        }
    }
}
