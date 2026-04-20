//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportCommon.cs                    </Name>
//    <Description> Spoleèné vìci pro lehkého i tlustého                        </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2013                            </Copyright>
//    <Created>     2006-07-28                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Web;
using System.IO;
using Gordic.General;
using Gordic.Report.Interface;
using Gordic.General.ApplicationInterface;
using System.Collections.Generic;

namespace Gordic.Report.Interface
{
    /// <exclude/>
    [System.Security.SecurityCritical]
    public static class GReportCommon
	{
        ///// <exclude/>
        //static public bool IsAllSameTema(IGReportTree repTree)
        //{
        //    if (repTree.Count > 1)
        //    {
        //        string l_sFirstTema = repTree[0].Tema;
        //        for (int i = 1; i < repTree.Count; i++)
        //        {
        //            if (repTree[i].Tema != l_sFirstTema)
        //                return false;
        //        }
        //    }
        //    return true;
        //}

        /// <exclude/>
        static public string GetTemaZkratka(string tema)
        {
            int l_iPtmIndex = tema.IndexOf("_ptm_");
            if (l_iPtmIndex <= 0)
                return tema;
            return tema.Substring(l_iPtmIndex + 5);
        }

        /// <exclude/>
        static public bool ParseBool(string s)
        {
            switch (s.ToLower())
            {
                case "0":
                case "false":
                case "no":
                case "ne":
                case "n":
                case "f":
                    return false;
                case "1":
                case "true":
                case "yes":
                case "ano":
                case "y":
                case "t":
                    return true;
                default:
                    return bool.Parse(s);
            }
        }

        /// <exclude/>
        static public bool ParseBoolObject(object value, bool def)
        {
            if (value == null)
                return def;
            if (value is String)
            {
                if (((string)value).Length == 0)
                    return def;
                return ParseBool((string)value);
            }
            if (value is Boolean)
                return (bool)value;
            return def;
        }

        /// <exclude/>
        static public void UnzipTemplate(string l_sZipFile, string l_sPath)
        {
            try
            {
                GZip.Unzip(l_sZipFile, l_sPath);
            }
            finally
            {
                File.Delete(l_sZipFile);
            }
        }

        ///// <exclude/>
        //static public string GetFormattingGroup(IGConfiguration cfg, IGReport report)
        //{
        //    object l_FmtObject = report.VisualRepresentations[0].LocalInfos["FORMATTING_GROUP"];
        //    string l_FmtType = l_FmtObject != null ? l_FmtObject.ToString().Trim() : "";
        //    if (l_FmtType.Length == 0)
        //    {
        //        IGMemoryFile alf = ((IGVisualRepresentationImpl)report.VisualRepresentations[0]).Files[0];
        //        if (alf == null)
        //        {
        //            return "UNKNOWN";
        //            //object l_name = report.VisualRepresentations[0].LocalInfos["ALF_FILE_NAME"];
        //            //if (l_name == null) l_name = "<no name>";
        //            //throw new GReportUserException(21000010, 5, l_name.ToString()); // <resource value=5>Nelze nahrát soubor formátu sestavy {0}.</resource>
        //        }

        //        if (GSafeRepWrapper.UseSafe(cfg))
        //        {
        //            lock (typeof(GSafeRepWrapper))
        //            {
        //                string l_FileAlf = alf.SaveToTemp(null);
        //                try
        //                {
        //                    l_FmtType = GSafeRepWrapper.GetFormatGroup(cfg, l_FileAlf);
        //                }
        //                finally
        //                {
        //                    File.Delete(l_FileAlf);
        //                }
        //            }
        //        }
        //        else
        //        {
        //            lock (typeof(GUnsafeRepWrapper))
        //            {
        //                string l_FileAlf = alf.SaveToTemp(null);
        //                try
        //                {
        //                    l_FmtType = GUnsafeRepWrapper.OpenFormatForInfo(l_FileAlf).GetFormatGroup();
        //                }
        //                finally
        //                {
        //                    File.Delete(l_FileAlf);
        //                }
        //            }
        //        }
        //    }
        //    return l_FmtType.ToUpper();
        //}

        public class FileDisplayInfos
        {
            public string AlfFile;
            public string XmeFile;
            public string DatFile;
        }

        /// <summary>
        /// Spuštìní pøevodního mostu - nízká úrovìò GINISu
        /// </summary>
        static public void RunBridge(IGReportConfiguration cfg, string xme, string alf, string dat, string pth, string bridge, string outname, Dictionary<string, string> customProperties = null, GUnsafeRepWrapper.IPrintFormat pfrm = null, string encPassword = null, GString ico = null, FileDisplayInfos fdi = null)
        {
            if (ico.IsNull() && customProperties != null)
            {
                string l_s;
                if (customProperties.TryGetValue("Ico", out l_s)) ico = l_s;
            }
            using (var l_Znak = cfg?.Files?.GetZnakFileName(ico))
                RunBridgeN(xme, alf, dat, pth, bridge, outname, customProperties, pfrm, "znak-m.bmp", l_Znak?.FileName, encPassword, fdi);
        }
        /// <summary>
        /// Spuštìní pøevodního mostu - možno i mimo GINIS. V GINISu použijte pøetížení s IGConfiguration/IGReport
        /// </summary>
        static public void RunBridgeN(string xme, string alf, string dat, string pth, string bridge, string outname, Dictionary<string, string> customProperties = null, GUnsafeRepWrapper.IPrintFormat pfrm = null, string globalImage = null, string globalImageReloc = null, string encPassword = null, FileDisplayInfos fdi = null, Dictionary<string,string> imageReloc = null)
        {
            try
            {
                lock (typeof(GUnsafeRepWrapper))
                {
                    GUnsafeRepWrapper.GReporterStructure l_oStruct = null;
                    GUnsafeRepWrapper.GReporterFormat l_oFormat = null;
                    GUnsafeRepWrapper.GReporterData l_oData = null;
                    try
                    {
                        GUnsafeRepWrapper.SetParameter("working_dir", pth);
                        GUnsafeRepWrapper.SetParameter09("FilesPath", pth);
                        GUnsafeRepWrapper.SetParameter("developer_mode", "0");

                        // nastaveni globalniho obrazku pro GINIS
                        if (string.IsNullOrEmpty(globalImage) == false)
                        {
                            GUnsafeRepWrapper.SetParameter("image_global", globalImage);
                            if (string.IsNullOrEmpty(globalImageReloc) == false)
                            {
                                GUnsafeRepWrapper.SetParameter("image_reloc_" + globalImage, globalImageReloc);
                            }
                        }
                        if(imageReloc != null)
                            foreach(var ir_kv in imageReloc)
                                GUnsafeRepWrapper.SetParameter("image_reloc_" + ir_kv.Key, ir_kv.Value);

                        if (encPassword != null) GUnsafeRepWrapper.SetParameter09("Enc_Password", encPassword);
                        if (customProperties != null)
                            try
                            {
                                foreach (var cp in customProperties)
                                {
                                    GUnsafeRepWrapper.SetParameter09("Cust_" + cp.Key, cp.Value);
                                }
                            }
                            catch (GReportException e)
                            {
                                System.Diagnostics.Debug.WriteLine("CustomProperties not set: " + e.Message);
                            }

                        l_oStruct = GUnsafeRepWrapper.OpenStructure(xme, fdi == null ? null : fdi.XmeFile);
                        l_oFormat = GUnsafeRepWrapper.OpenFormat(alf, fdi == null ? null : fdi.AlfFile);
                        l_oData = GUnsafeRepWrapper.OpenData(dat, l_oStruct, l_oFormat, fdi == null ? null : fdi.DatFile, (fdi == null ? null : fdi.AlfFile) ?? alf);

                        try
                        {
                            GUnsafeRepWrapper.RunBridge(l_oData, pfrm, bridge.ToUpperInvariant(), outname);
                        }
                        catch
                        {
                            try { File.Delete(outname); }
                            catch (Exception) { }
                            throw;
                        }
                    }
                    finally
                    {
                        if (l_oData != null) l_oData.Dispose();
                        if (l_oFormat != null) l_oFormat.Dispose();
                        if (l_oStruct != null) l_oStruct.Dispose();
                    }
                }
            }
            catch (GReportAbortException) { throw; } //to uz nebudu zabalovat do nejake nespecificke vyjimky
            catch (GReportUserException) { throw; } //to uz nebudu zabalovat do nejake nespecificke vyjimky
            catch (GReportException) { throw; } //to uz nebudu zabalovat do nejake nespecificke vyjimky
            catch (Exception e)
            {
                throw new GReportException(21000024, 16, e, fdi?.AlfFile ?? alf, bridge); //RC-EX 16 : Chyba formátování sestavy {0} -> {1}
            }
        }

        /// <summary>
        /// Spuštìní pøevodního mostu - integrace GINIS IGReport
        /// </summary>
        static public void RunBridge(IGReportConfiguration cfg, IGReport report, string bridge, string outname)
        {
            string l_sTempPath = GTempFiles.CreateTempDirectory(Path.GetDirectoryName(outname));
            string l_sXME = "";
            string l_sALF = "";
            string l_sDATA = "";
            string l_sZip = "";
            FileDisplayInfos fdi = new FileDisplayInfos();
            try
            {
                IGReportImplementation l_oRImp = report as IGReportImplementation;
                if (l_oRImp == null) throw new GArgumentException(21000065);
                IGVisualRepresentation l_oVis = report.VisualRepresentations[0] as IGVisualRepresentation;
                IGVisualRepresentationImpl l_oVisImpl = l_oVis as IGVisualRepresentationImpl;

                //data
                if (l_oRImp.Files[1] == null) throw new GArgumentException(21000066);
                l_sDATA = l_oRImp.Files[1].SaveToTemp(l_sTempPath, asCopy: true);
                fdi.DatFile = (report.CommonInfos["FILE_NAME"] ?? "").ToString();

                // xme
                if (l_oRImp.Files[2] == null) throw new GArgumentException(21000067);
                l_sXME = l_oRImp.Files[2].SaveToTemp(l_sTempPath, asCopy: true);
                fdi.XmeFile = (report.CommonInfos["XME_FILE_NAME"] ?? "").ToString();

                // alf 
                string ixs = (l_oVis.LocalInfos["IXS_FRM"] ?? l_oVis.LocalInfos["NAME"])?.ToString();
                if (l_oVisImpl.Files[0] == null)
                {
                    throw new GReportUserException(21000012, 8, ixs); //RC-EX 8 : Vybraný formát není k dispozici ({0})
                }
                l_sALF = l_oVisImpl.Files[0].SaveToTemp(l_sTempPath, asCopy: true);
                fdi.AlfFile = (l_oVis.LocalInfos["ALF_FILE_NAME"] ?? "").ToString();
                if (l_oVisImpl.Files[1] != null) // mame zip
                {
                    l_sZip = l_oVisImpl.Files[1].SaveToTemp(l_sTempPath, asCopy: true);
                    UnzipTemplate(l_sZip, l_sTempPath);
                }

                var customProperties = GetCustomProperties(cfg?.ApplicationInfo, cfg?.SessionInfo, report);
                GUnsafeRepWrapper.IPrintFormat pfrm = report.Parameters["PrintFormat"] as GUnsafeRepWrapper.IPrintFormat;
                GString enc_password = GString.Parse(report.Parameters["Enc_Password"], true);
                GString ico = GString.Parse(report.Parameters["ICO"], true);
                if (ico.IsNull && customProperties != null)
                {
                    string l_s;
                    if (customProperties.TryGetValue("Ico", out l_s)) ico = l_s;
                }

                if (bridge == "PDF" && cfg?.Configuration != null)
                {
                    var l_VerPdf = cfg.Configuration.GetDatabaseParameter("gin_pdf_verpdf", 1); //zmìna default na PDF/A-2
                    switch (l_VerPdf)
                    {
                        case 0:
                            bridge = "PDF$A1";
                            break;
                        case 1:
                            bridge = "PDF$A2";
                            break;
                        case 2:
                            bridge = "PDF$A3";
                            break;
                    }
                }

                report.ViewerParameters["BRIDGE_XME"] = l_sXME;
                report.ViewerParameters["BRIDGE_ALF"] = l_sALF;
                report.ViewerParameters["BRIDGE_DAT"] = l_sDATA;
                cfg?.BeginFormatting(report, ixs, l_oVis.LocalInfos["FORMATTING_GROUP"].ToString(), bridge);
                //l_oRImp.OnBeginFormatting(ixs, l_oVis.LocalInfos["FORMATTING_GROUP"].ToString(), bridge);
                try
                {
                    RunBridge(cfg, l_sXME, l_sALF, l_sDATA, l_sTempPath, bridge, outname, customProperties, pfrm, enc_password.GetValueOrNull(), ico, fdi);
                    cfg?.EndFormatting(report, null);
                }
                catch (Exception e)
                {
                    cfg?.EndFormatting(report, e);
                    throw;
                }
            }
            finally
            {
                report.ViewerParameters.Remove("BRIDGE_XME");
                report.ViewerParameters.Remove("BRIDGE_ALF");
                report.ViewerParameters.Remove("BRIDGE_DAT");

                // smazeme tempfily
                if (cfg?.Configuration == null || cfg.Configuration.GetParameter("Reporter-bridge-erase", true))
                    GTempFiles.DeleteTempDirectory(l_sTempPath);
            }
        }

        /// <exclude/>
        static public void RunReportAction(IGConfiguration cfg, IGApplicationInfo ApplicationInfo, IGSessionInfo SessionInfo, IGReport report, string action, string outname)
        {
            string l_sTempPath = GTempFiles.CreateTempDirectory(Path.GetDirectoryName(outname));
            string l_sXME = "";
            string l_sALF = "";
            string l_sDATA = "";
            string l_sZip = "";

            try
            {
                IGReportImplementation l_oRImp = report as IGReportImplementation;
                if (l_oRImp == null) throw new GArgumentException(21000028);
                IGVisualRepresentation l_oVis = report.VisualRepresentations[0] as IGVisualRepresentation;
                IGVisualRepresentationImpl l_oVisImpl = l_oVis as IGVisualRepresentationImpl;

                //data
                if (l_oRImp.Files[1] == null) throw new GArgumentException(21000029);
                l_sDATA = l_oRImp.Files[1].SaveToTemp(l_sTempPath);
                // xme
                if (l_oRImp.Files[2] == null) throw new GArgumentException(21000030);
                l_sXME = l_oRImp.Files[2].SaveToTemp(l_sTempPath);
                // alf 
                string ixs = (l_oVis.LocalInfos["IXS_FRM"] ?? l_oVis.LocalInfos["NAME"]).ToString();
                if (l_oVisImpl.Files[0] == null)
                {
                    throw new GReportUserException(21000027, 8, ixs); //RC-EX 8 : Vybraný formát není k dispozici ({0})
                }
                l_sALF = l_oVisImpl.Files[0].SaveToTemp(l_sTempPath, asCopy: true);
                if (l_oVisImpl.Files[1] != null) // mame zip
                {
                    l_sZip = l_oVisImpl.Files[1].SaveToTemp(l_sTempPath, asCopy: true);
                    UnzipTemplate(l_sZip, l_sTempPath);
                }

                lock (typeof(GUnsafeRepWrapper))
                {
                    GUnsafeRepWrapper.GReporterStructure l_oStruct = null;
                    GUnsafeRepWrapper.GReporterFormat l_oFormat = null;
                    GUnsafeRepWrapper.GReporterData l_oData = null;
                    try
                    {
                        GUnsafeRepWrapper.SetParameter("working_dir", l_sTempPath);
                        GUnsafeRepWrapper.SetParameter09("FilesPath", l_sTempPath);

                        l_oStruct = GUnsafeRepWrapper.OpenStructure(l_sXME);
                        l_oFormat = GUnsafeRepWrapper.OpenFormat(l_sALF);
                        l_oData = GUnsafeRepWrapper.OpenData(l_sDATA, l_oStruct, l_oFormat);

                        try
                        {
                            GUnsafeRepWrapper.RunAction(l_oData, action, ref outname);
                        }
                        catch
                        {
                            try { File.Delete(outname); }
                            catch (Exception) { }
                            throw;
                        }
                    }
                    finally
                    {
                        if (l_oData != null) l_oData.Dispose();
                        if (l_oFormat != null) l_oFormat.Dispose();
                        if (l_oStruct != null) l_oStruct.Dispose();
                    }
                }
            }
            finally
            {
                // smazeme tempfily
                GTempFiles.DeleteTempDirectory(l_sTempPath);
            }
        }

        /// <exclude/>
        static public void RunTextBridge(IGReportConfiguration cfg, IGReport report, string inname, string bridge, string outname)
        {
            try
            {
                IGReportImplementation l_oRImp = report as IGReportImplementation;
                if (l_oRImp == null) throw new GArgumentException(21000025);

                GUnsafeRepWrapper.IPrintFormat pfrm = report.Parameters["PrintFormat"] as GUnsafeRepWrapper.IPrintFormat;

                cfg?.BeginFormatting(report, "", "Text", bridge);

                lock (typeof(GUnsafeRepWrapper))
                {
                    GUnsafeRepWrapper.SetParameter09("FilesPath", Path.GetDirectoryName(inname));

                    var customProperties = GetCustomProperties(cfg?.ApplicationInfo, cfg?.SessionInfo, report);
                    try
                    {
                        foreach (var cp in customProperties)
                        {
                            GUnsafeRepWrapper.SetParameter09("Cust_" + cp.Key, cp.Value);
                        }
                    }
                    catch (GReportException e)
                    {
                        System.Diagnostics.Debug.WriteLine("CustomProperties not set: " + e.Message);
                    }

                    string enc_password = report.Parameters["Enc_Password"] as string;
                    if (enc_password != null) GUnsafeRepWrapper.SetParameter09("Enc_Password", enc_password);
                    //GString ico = GString.Parse(report.Parameters["ICO"], true);

                    try
                    {
                        GUnsafeRepWrapper.RunTextBridge(inname, pfrm, bridge.ToUpperInvariant(), outname);
                    }
                    catch
                    {
                        try { File.Delete(outname); }
                        catch (Exception) { }
                        throw;
                    }
                }
                cfg?.EndFormatting(report, null);
            }
            catch (Exception e)
            {
                cfg?.EndFormatting(report, e);
                throw;
            }
        }
        /// <summary>
        /// Spuštìní pøevodního mostu - možno i mimo GINIS. V GINISu použijte pøetížení s IGConfiguration/IGReport
        /// </summary>
        static public void RunTextBridgeN(string inname, string bridge, string outname, string enc_password = null, GUnsafeRepWrapper.IPrintFormat pfrm = null)
        {
            lock (typeof(GUnsafeRepWrapper))
            {
                GUnsafeRepWrapper.SetParameter09("FilesPath", Path.GetDirectoryName(inname));
                if (enc_password != null) GUnsafeRepWrapper.SetParameter09("Enc_Password", enc_password);

                try
                {
                    GUnsafeRepWrapper.RunTextBridge(inname, pfrm, bridge.ToUpperInvariant(), outname);
                }
                catch
                {
                    try { File.Delete(outname); }
                    catch (Exception) { }
                    throw;
                }
            }
        }

        /// <summary>
        /// Vrací seznam vlastností, které by se mìly uložit do metainformací souboru, pokud se ten bude ukládat na disk
        /// </summary>
        public static Dictionary<string, string> GetCustomProperties(IGApplicationInfo applicationInfo, IGSessionInfo sessionInfo, IGReport report)
        {
            if (report == null) throw new GArgumentNullException(21000045);
            Dictionary<string, string> dict = new Dictionary<string, string>(StringComparer.CurrentCultureIgnoreCase);

            try
            {
                object p9 = report.Parameters["X0009"];
                if (p9 != null && p9.ToString().Length >= 17 && p9.ToString()[17]=='#')
                {
                    GReportX0009Base x9 = new GReportX0009Base(null, null, report, true);
                    if (applicationInfo != null) dict.Add("APP", "GINIS " + applicationInfo.ShortName.BaseValueTrimmed.Substring(0, 3));
                    if (sessionInfo != null) dict.Add("Author", sessionInfo.NazevRf);
                    if (x9.IcoPresent) dict.Add("Ico", x9.Ico);
                    if (x9.RokPresent) dict.Add("Rok", x9.Rok.ToString());
                    foreach (string k in x9.ItemKeys)
                    {
                        if (k == "LPC") continue;
                        if (k == "IXS_LPC") continue;
                        if (k == "WHE") continue; //vynecham (nap. GINIS KDF predava cast WHERE)
                        if (System.Linq.Enumerable.All(k, Char.IsLetterOrDigit) == false) continue; //neni slozeno jen z pismen a cisel -> vyloucim
                        var val = x9[k].ToString();
                        val = val.Replace('\'', ' ').Replace('"', ' ');
                        dict[k]  = val;
                    }
                }
            }
            catch (Exception) { }//asi tam neni standartni X0009. Pak nemuzu nic zjistit, ale spadnout to nenecham

            return dict;
        }

        /// <summary>
        /// rep_EncodeString pro rtf texty (rtf-compresed)
        /// </summary>
        /// <param name="input"></param>
        static public byte[] DecodeString(string input)
        {
            lock (typeof(GUnsafeRepWrapper))
            {
                return GUnsafeRepWrapper.DecodeString(input);
            }
        }

        /// <summary>
        /// rep_EncodeString pro rtf texty (rtf-compresed)
        /// </summary>
        /// <param name="input"></param>
        static public string EncodeString(byte[] input)
        {
            lock (typeof(GUnsafeRepWrapper))
            {
                return GUnsafeRepWrapper.EncodeString(input);
            }
        }
        private static System.Collections.Generic.Dictionary<string, string> ms_typesTable = null;
        /// <exclude/>
        static public string GetTypesForGroup(IGConfiguration cfg, string group)
        {
            string res;
            if (ms_typesTable == null)
            {
                ms_typesTable = new System.Collections.Generic.Dictionary<string, string>();
            }
            else
            {
                if (ms_typesTable.TryGetValue(group, out res))
                    return res;
            }

            {
                lock (typeof(GUnsafeRepWrapper))
                {
                    res = GUnsafeRepWrapper.GetTypesForGroup(group);
                }
            }
            ms_typesTable[group] = res;
            return res;
        }
        /// <exclude/>
        static public string GetTypesForFormat(IGConfiguration cfg, string alf, string fdi = null)
        {
            string res;
            GUnsafeRepWrapper.GReporterFormat l_oFormat = null;
            lock (typeof(GUnsafeRepWrapper))
            {
                try
                {
                    l_oFormat = GUnsafeRepWrapper.OpenFormat(alf, fdi);

                    res = GUnsafeRepWrapper.GetFileTypesFormat(l_oFormat.Format);
                }
                finally
                {
                    if (l_oFormat != null) l_oFormat.Dispose();
                }
            }
            return res;
        }
        /// <exclude/>
        static public string GetTypesForReport(IGConfiguration cfg, IGReport report)
        {
            IGReportImplementation l_oRImp = report as IGReportImplementation;
            if (l_oRImp == null) throw new GArgumentException(21000084);
            var l_vis = report.VisualRepresentations[0] as IGVisualRepresentation;
            if (l_vis == null) throw new GArgumentException(21000133);
            try
            {
                return GetTypesForReport(cfg, l_vis);
            }
            catch (GReportException)
            {
                object l_o = report.VisualRepresentations[0].LocalInfos["FORMATTING_GROUP"];
                if (l_o == null)
                    throw new GArgumentException(21000134);
                return GetTypesForGroup(cfg, l_o.ToString());
            }
        }

        /// <exclude/>
        static public string GetTypesForReport(IGConfiguration cfg, IGVisualRepresentation reportVisual)
        {
            IGVisualRepresentationImpl l_oVisImpl = reportVisual as IGVisualRepresentationImpl;

            // alf 
            if (l_oVisImpl.Files[0] == null) return ""; //nema format, nema ani zadne vystupy

            string l_sTempPath = GTempFiles.CreateTempDirectory();
            string l_sALF = "";
            string l_sZip = "";
            try
            {
                l_sALF = l_oVisImpl.Files[0].SaveToTemp(l_sTempPath, asCopy: true);
                if (l_oVisImpl.Files[1] != null) // mame zip
                {
                    l_sZip = l_oVisImpl.Files[1].SaveToTemp(l_sTempPath, asCopy: true);
                    UnzipTemplate(l_sZip, l_sTempPath);
                }

                var fdi = (reportVisual.LocalInfos["ALF_FILE_NAME"] ?? "").ToString();
                return GetTypesForFormat(cfg, l_sALF, fdi);
            }
            finally
            {
                // smazeme tempfily
                GTempFiles.DeleteTempDirectory(l_sTempPath);
            }
        }
        
        /// <exclude/>
        public static void CheckConfig(IGConfiguration cfg, IGApplicationInfo apl)
        {
        }

        /// <exclude/>
        public static bool IsMSWordInstalled
        {
            get
            {
                using (Microsoft.Win32.RegistryKey k = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(
                            @"CLSID\{000209FF-0000-0000-C000-000000000046}\LocalServer32"
                            ))
                {
                    if (k == null)
                        return false; //klic neexistuje = Word neni instalovan = zakaz Wordu
                    object o = k.GetValue("");
                    if (o == null)
                        return false; //klic nema def. hodnotu = Word neni instalovan
                }
                return true;
            }
        }

        /// <exclude/>
        public static bool IsMSExcelInstalled
        {
            get
            {
                using (Microsoft.Win32.RegistryKey k = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(
                            @"CLSID\{00020812-0000-0000-C000-000000000046}\LocalServer32"
                            ))
                {
                    if (k == null)
                        return false; //klic neexistuje = Word neni instalovan = zakaz Wordu
                    object o = k.GetValue("");
                    if (o == null)
                        return false; //klic nema def. hodnotu = Word neni instalovan
                }
                return true;
            }
        }


        #region SRZ
        internal static bool _contains_invalid_xml_char(string s)
        {
            foreach (char c in s)
            {
                if ((int)c < 32)
                {
                    if (c == '\n' || c == '\r' || c == '\t') continue;
                    return true;
                }
            }
            return false;
        }
        internal static string _xml(string s)
        {
            if (s == null) return "";
            System.Text.StringBuilder sb = new System.Text.StringBuilder(s);
            for (int i = 0; i < sb.Length; i++)
            {
                var c = sb[i];
                switch (c)
                {
                    case '&': sb.Insert(i + 1, "amp;"); break;
                    case '<': sb.Remove(i, 1); sb.Insert(i, "&lt;"); break;
                    case '>': sb.Remove(i, 1); sb.Insert(i, "&gt;"); break;
                    case '"': sb.Remove(i, 1); sb.Insert(i, "&quot;"); break;
                    case '\'': sb.Remove(i, 1); sb.Insert(i, "&apos;"); break;
                    default:
                        //v XML 1.0 jsou znaky pod 32 stejne zakazane (krome \n a \r)
                        if ((int)c < 32)
                        {
                            sb.Remove(i, 1); sb.Insert(i, string.Format("&#{0};", (int)c));
                        }
                        break;
                }
            }
            return sb.ToString();
        }

        /// <exclude/>
        public static string[] SaveGrrReport(string l_sPth, IGReport report, bool isSRZ, IGReportConfiguration cfg, bool useLocalPaths = false, bool saveGeneratorInsteadData = false)
        {
            return SaveGrrReport(l_sPth, report, isSRZ, cfg, GetCustomProperties(cfg?.ApplicationInfo, cfg?.SessionInfo, report), useLocalPaths, saveGeneratorInsteadData);
        }

        /// <exclude/>
        public static string[] SaveGrrReport(string l_sPth, IGReport report, bool isSRZ, IGReportConfiguration cfg, Dictionary<string, string> customProperties, bool useLocalPaths = false, bool saveGeneratorInsteadData = false)
        {
            // hlavicka
            IGMemoryFile l_oSsr = new GMemoryFile();
            string l_sReport = SaveGrrReport_1(l_sPth, report, isSRZ, cfg, customProperties, useLocalPaths, saveGeneratorInsteadData);
            l_oSsr.Write("<?xml version=\"1.0\" encoding=\"windows-1250\"?>\n");
            l_oSsr.Write("<reports xmlns=\"http://www.gordic.cz/TR/ssr/1.0\"");
            if (isSRZ)
            {
                UInt32 crc = computeCrc(new DirectoryInfo(l_sPth).GetFiles());
                l_oSsr.Write($" crc='{(crc & 0xffff) ^ 0x4242:x4}{(crc >> 16) ^ 0x2424:x4}'");
            }
            l_oSsr.Write(">\n");

            //l_oSsr.Write("  <report title=\"" + _xml(report.CommonInfos["NAZEV"].ToString()) + "\">\n");
            l_oSsr.Write($"  <report title=\"{_xml(report.CommonInfos["NAZEV"]?.ToString())}\" default-format=\"{_xml(report.VisualRepresentationsOrdered[report.DefaultVisualRepresentation].LocalInfos["ALF_FILE_NAME"]?.ToString())}\" >\n");
            l_oSsr.Write(l_sReport);
            l_oSsr.Write("  </report>\n");

            l_oSsr.Write("</reports>\n");
            // ulozime ssr
            string l_sPthF = Path.Combine(l_sPth, "grr_report.ssr");
            l_oSsr.SaveTo(l_sPthF);
            string[] l_oReturn = new string[1];
            l_oReturn[0] = l_sPthF;
            return l_oReturn;
        }

        private static string SaveGrrReport_1(string l_sPth, IGReport report, bool isSRZ, IGReportConfiguration cfg, Dictionary<string, string> customProperties, bool useLocalPaths, bool saveGeneratorInsteadData = false)
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            IGReportImplementation l_oReportImpl = report as IGReportImplementation;
            sb.Append("    <meta");
            if (cfg?.ApplicationInfo?.Revize != null) sb.Append($" appplication='{_xml(cfg.ApplicationInfo.Revize)}'"); //navíc oproti customProperties["APP"] kde je applicationInfo.ShortName
            if (report.CommonInfos["ID_SES"] != null) sb.Append($" id_ses='{_xml(report.CommonInfos["ID_SES"].ToString())}'");
            if (report.CommonInfos["IXS_ALV"] != null) sb.Append($" ixs_alv='{_xml(report.CommonInfos["IXS_ALV"].ToString())}'");
            if (report.CommonInfos["DAT_MODIF"] != null) sb.Append($" dat_modif='{_xml(report.CommonInfos["DAT_MODIF"].ToString())}'");
            var l_saveasParam = report.ViewerParameters["save_as"]?.ToString();
            if (l_saveasParam != null) sb.Append($" Pref_SaveName='{l_saveasParam}'");
            foreach (var cp in customProperties)
            {
                sb.Append($" Cust_{cp.Key}='{_xml(cp.Value)}'");
            }
            sb.Append("/>\n");


            GPrintFormat pfrm = report.Parameters["PrintFormat"] as GPrintFormat;
            if (pfrm != null)
            {
                sb.Append($"    <print format='{_xml(pfrm.FullName)}'/>\n");
            }

            GString ico = GString.Parse(report.Parameters["ICO"], true);
            if (ico.IsNull && customProperties != null)
            {
                string l_s;
                if (customProperties.TryGetValue("Ico", out l_s)) ico = l_s;
            }

            //globalni obrazky
            if (isSRZ == false)
            {
                using (IGReportGlobalFile l_Znak = cfg?.Files.GetZnakFileName(ico))
                    if (l_Znak != null)
                    {
                        if (l_Znak is GReportGlobalRealFile) //pro TK nemusím kopírovat, mám soubor na disku
                            sb.Append($"    <image-reloc name='ZNAK-M.BMP' to='{_xml(l_Znak.FileName)}'/>\n");
                        else
                        {
                            sb.Append("    <image-path path='.'/>\n"); //kopie souboru vyžaduje image-path
                            var fn = l_Znak.CopyTo(l_sPth);
                            sb.Append($"    <image-reloc name='ZNAK-M.BMP' to='{_xml(fn)}'/>\n");
                        }
                    }
            }
            else
            {
                sb.Append("    <image-path path='.'/>\n");
                using (IGReportGlobalFile l_Znak = cfg?.Files.GetZnakFileName(ico))
                    if (l_Znak != null)
                    {
                        var fn = l_Znak.CopyTo(l_sPth);
                        //var fn = Path.GetFileName(l_Znak.FileName);
                        sb.Append($"    <image-reloc name='ZNAK-M.BMP' to='{_xml(fn)}'/>\n");
                        //File.Copy(sourceFileName: l_Znak.FileName, destFileName: Path.Combine(l_sPth, fn));
                    }
            }
            sb.Append("    <image-global name='znak-m.bmp'/>\n");  // nastaveni globalniho obrazku pro GINIS

            string l_sPthF;
            // ulozime xme
            if (report.CommonInfos["XME_FILE_NAME"] == null)
                throw new GReportException(21000013, 6, "CommonInfos", "XME_FILE_NAME"); //RC-EX 6 : Objekt report nemá v {0}  uveden identifikátor: {1}

            var l_XmeFile = l_oReportImpl.Files[2];
            if (l_XmeFile != null)
            {
                var xmeFileName = report.CommonInfos["XME_FILE_NAME"]?.ToString();
                string l_sXme = string.IsNullOrEmpty(xmeFileName) ? "struct.xme" : xmeFileName;
                if (useLocalPaths && Path.IsPathRooted(l_XmeFile.FileName))
                    l_sXme = l_XmeFile.FileName;
                else
                {
                    l_sPthF = Path.Combine(l_sPth, l_sXme);
                    l_XmeFile.SaveTo(l_sPthF, true);
                }
                sb.Append($"    <structure file=\"{_xml(l_sXme)}\"/>\n");
            }

            if (saveGeneratorInsteadData && l_oReportImpl.Files[0] != null)
            {
                var l_sAlv = l_oReportImpl.Files[0].FileName; //report.CommonInfos["FILE_NAME"].ToString();
                if (useLocalPaths && Path.IsPathRooted(l_oReportImpl.Files[0].FileName))
                    l_sAlv = l_oReportImpl.Files[0].FileName;
                else
                {
                    l_sPthF = Path.Combine(l_sPth, l_sAlv);
                    l_oReportImpl.Files[0].SaveTo(l_sPthF, true);
                }
                sb.Append($"    <generator file=\"{_xml(l_sAlv)}\""); //
                foreach (DictionaryEntry p in report.Parameters)
                {
                    var val = p.Value.ToString();
                    if (string.IsNullOrWhiteSpace(val)) continue;
                    if (_contains_invalid_xml_char(val))
                        sb.Append($" {p.Key}_base64=\"{Convert.ToBase64String(System.Text.Encoding.Default.GetBytes(val))}\"");
                    else
                        sb.Append($" {p.Key}=\"{_xml(val)}\"");
                }
                sb.Append("/>\n");
            }
            else if(l_oReportImpl.Files[1] != null)
            {
                // ulozime data
                var dataFileName = report.CommonInfos["DATA_FILE_NAME"] as string;
                string l_sData = string.IsNullOrEmpty(dataFileName) ? "data.dat" : dataFileName;
                l_sPthF = Path.Combine(l_sPth, l_sData);
                l_oReportImpl.Files[1].SaveTo(l_sPthF, true);
                sb.Append($"    <data file=\"{_xml(l_sData)}\"/>\n");
            }

            string l_SignName = "data.p7s";
            object l_Orig = report.Parameters["Original Data"];
            if (l_Orig != null)
            {
                string l_OrigName = "orig.dat";
                if (report.CommonInfos["ORIGINAL DATA_FILE_NAME"] != null)
                    l_OrigName = report.CommonInfos["ORIGINAL DATA_FILE_NAME"].ToString();
                l_SignName = Path.ChangeExtension(l_OrigName, ".p7s");
                l_sPthF = Path.Combine(l_sPth, l_OrigName);
                IGMemoryFile l_OrigMem = new GMemoryFile((byte[])l_Orig);
                l_OrigMem.SaveTo(l_sPthF, true);
                sb.Append($"    <original-data file=\"{_xml(l_OrigName)}\"/>\n");
            }

            object l_Signature = report.Parameters["Signature"];
            if (l_Signature != null)
            {
                l_sPthF = Path.Combine(l_sPth, l_SignName);
                IGMemoryFile l_OrigMem = new GMemoryFile((byte[])l_Signature);
                l_OrigMem.SaveTo(l_sPthF, true);
                sb.Append($"    <signature file=\"{_xml(l_SignName)}\"/>\n");
            }

            // ulozime vsechny alfy
            for (int i = 0; i < report.VisualRepresentationsOrdered.Length; i++)
            {
                IGVisualRepresentation l_oVis = report.VisualRepresentationsOrdered[i] as IGVisualRepresentation;

                var alfFileName = l_oVis.LocalInfos["ALF_FILE_NAME"]?.ToString();
                //if (l_oVis.LocalInfos["ALF_FILE_NAME"] == null)
                //    throw new GReportException(21000014, 6, "LocalInfos", "ALF_FILE_NAME"); //RC-EX 6 : Objekt report nemá v {0}  uveden identifikátor: {1}
                string l_sAlf = string.IsNullOrEmpty(alfFileName) ? $"format{i+1}.alf" : alfFileName;

                string l_name = (l_oVis.LocalInfos["NAME"] ?? GResources.GetResourceText(37)).ToString(); //RC 37 : bezejmenný
                //if (l_oVis.LocalInfos["NAME"] == null)
                //    throw new GReportException(21000015, 6, "LocalInfos", "NAME"); //RC-EX 6 : Objekt report nemá v {0}  uveden identifikátor: {1}

                IGMemoryFile alf = ((IGVisualRepresentationImpl)l_oVis).Files[0];
                IGMemoryFile zip = ((IGVisualRepresentationImpl)l_oVis).Files[1];                ;
                if (alf != null)
                {
                    if (useLocalPaths && Path.IsPathRooted(alf.FileName))
                        l_sAlf = alf.FileName;
                    else
                    {
                        l_sPthF = Path.Combine(l_sPth, l_sAlf);
                        alf.SaveTo(l_sPthF, true);

                        // mame i ZIP ?
                        if (zip != null)
                        {
                            l_sPthF = Path.ChangeExtension(l_sPthF, ".zip");
                            zip.SaveTo(l_sPthF, true);
                        }

                    }

                    sb.Append($"    <format file=\"{_xml(l_sAlf)}\" title=\"{_xml(l_name)}\"/>\n");
                }
                else if (i == report.DefaultVisualRepresentation)
                {
                    //vychozi ALF _musi_ existovat
                    string ixs = (l_oVis.LocalInfos["IXS_FRM"] ?? l_name).ToString();
                    throw new GReportUserException(21000016, 8, ixs); //RC-EX 8 : Vybraný formát není k dispozici ({0})
                }
            }
            return sb.ToString();
        }

        private static UInt32 computeCrc(FileInfo[] files)
        {
            unchecked
            {
                UInt32 crc = 0;
                foreach (FileInfo l_file in files)
                {
                    const int BUFSIZE = 1024;
                    byte[] buf = new byte[BUFSIZE];

                    using (FileStream fs = l_file.OpenRead())
                        while (true)
                        {
                            int l = fs.Read(buf, 0, BUFSIZE);
                            for (int k = 0; k < l; k++) crc += buf[k];
                            if (l < BUFSIZE) break;
                        }
                }
                return crc;
            }
        }

        ///// <exclude/>
        //public void MakeSRZ(IGReport report, string zipFileName, Gordic.General.ApplicationInterface.IGConfiguration config)
        //{
        //    string l_sdir = GTempFiles.CreateTempDirectory(GetReportTempPath());
        //    try
        //    {
        //        SaveGrrReport(l_sdir, report, true);
        //        Gordic.Support.Win32.GZip.ZipDirectoryContent(l_sdir, zipFileName);
        //    }
        //    finally
        //    {
        //        GTempFiles.DeleteTempDirectory(l_sdir);
        //    }
        //}
        #endregion

        public static void ProcessSaveName(IGSessionInfo si, IGReport report, ref string savename)
        {
            string l_eleFilename = report.Parameters["EleFilename"] as string;
            //mel bych overovat obsah? ted na odpovednosti volajiciho
            //System.IO.Path.GetFileNameWithoutExtension
            //General.GIOSupport.GetValidFileName
            ProcessSaveName(si, l_eleFilename, ref savename);
        }
        public static void ProcessSaveName(IGSessionInfo si, string eleFilename, ref string savename)
        {
            if (savename.Length > 0 && savename[0] == '.')
            {
                if (eleFilename == null) eleFilename = String.Format("g{0:0000000}", si.LogPorCislo);
                savename = eleFilename + savename;
            }
            else if (eleFilename != null) //mam neco vyplneno, ale take je zaslan EleFileName (tomu dam prednost)
            {
                savename = eleFilename + System.IO.Path.GetExtension(savename);
            }
        }

        public static string GetReportPath(string parameterValue, IGApplicationInfo app)
        {
            string l_sPth = parameterValue;
            if (l_sPth.StartsWith("CSIDL_APPDATA"))
            {
                if (app!= null && l_sPth.Length == "CSIDL_APPDATA".Length)
                    l_sPth = Path.Combine(System.Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "Gordic\\Ginis\\" + app.Faze);
                else
                    l_sPth = System.Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData) + l_sPth.Substring("CSIDL_APPDATA".Length);
            }
            //else if(l_sPth.StartsWith("CSIDL_COMMON_APPDATA"))
            //    l_sPth = System.Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData)+ l_sPth.Substring("CSIDL_COMMON_APPDATA".Length);
            else if (l_sPth.StartsWith("CSIDL_LOCAL_APPDATA"))
                l_sPth = System.Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) + l_sPth.Substring("CSIDL_LOCAL_APPDATA".Length);
            else if (l_sPth.StartsWith("CSIDL_PERSONAL"))
                l_sPth = System.Environment.GetFolderPath(Environment.SpecialFolder.Personal) + l_sPth.Substring("CSIDL_PERSONAL".Length);

            if (!Path.IsPathRooted(l_sPth))
                l_sPth = Path.Combine(GTempFiles.GetTempDirectory(), l_sPth);

            if (!Directory.Exists(l_sPth))
            {
                try
                {
                    Directory.CreateDirectory(l_sPth); // cestu vyrobime pokud neexistuje
                }
                catch (System.UnauthorizedAccessException e)
                {
                    GLogManager.CurrentClassLogger().Error(e, "GetReportPath");
                    l_sPth = GTempFiles.GetTempDirectory();
                }
            }

            return l_sPth;
        }

    }
}
