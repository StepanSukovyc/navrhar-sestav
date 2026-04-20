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

    [System.Security.SecurityCritical]
    public interface IGReportConfiguration
    {
        IGConfiguration Configuration { get; }
        IGApplicationInfo ApplicationInfo { get; }
        IGSessionInfo SessionInfo { get; }
        IGReportGlobalFiles Files { get; }

        //TODO dat sem
        //server implementace potrebuje volat zapis do ginllog bez newTransaction
        void BeginFormatting(IGReport r, string ixs_frm, string format_group, string bridge);

        //TODO dat sem
        void EndFormatting(IGReport r, Exception e);

    }

    [System.Security.SecurityCritical]
    public interface IGReportGlobalFiles
    {
        IGReportGlobalFile GetZnakFileName(GString ico = null);
    }
    public interface IGReportGlobalFile : IDisposable
    {
        string FileName { get; }
        string CopyTo(string path);
    }
    public class GReportGlobalRealFile : IGReportGlobalFile
    {        
        public GReportGlobalRealFile(string fileName)
        {
            FileName = fileName;
        }
        public string FileName { get; set; }

        public string CopyTo(string path)
        {
            var fn = Path.GetFileName(FileName);
            File.Copy(sourceFileName: FileName, destFileName: Path.Combine(path, fn));
            return fn;
        }

        public void Dispose()
        {
        }
    }
    public class GReportGlobalMemoryFile : IGReportGlobalFile
    {
        public GReportGlobalMemoryFile(IGMemoryFile mf)
        {
            MF = mf;
        }
        public IGMemoryFile MF { get; set; }
        public string FileName
        {
            get
            {
                if (MF == null) return null;
                if (m_temp == null) m_temp = GTempFiles.CreateTempDirectory();
                return MF.SaveToTemp(m_temp);
            }
        }
        public string CopyTo(string path)
        {
            if (MF == null) return null;
            var fn = Path.GetFileName(MF.FileName);
            MF.SaveTo(Path.Combine(path, fn), asCopy: true);
            return fn;
        }

        private string m_temp = null;

        public void Dispose()
        {
            if (m_temp != null) { GTempFiles.DeleteTempDirectory(m_temp); m_temp = null; }
            (MF as IDisposable)?.Dispose(); //?
        }

    }
    [System.Security.SecurityCritical]
    public abstract class GReportConfigurationAbstract : IGReportConfiguration, IGReportGlobalFiles
    {
        //GUserProcess UP;
        //public GReportDefaultConfiguration(GUserProcess userProcess)
        //{
        //    this.UP = userProcess;
        //}
        public abstract IGConfiguration Configuration { [System.Security.SecurityCritical] get; }
        public abstract IGApplicationInfo ApplicationInfo { [System.Security.SecurityCritical] get; }
        public abstract IGSessionInfo SessionInfo { [System.Security.SecurityCritical] get; }
        public IGReportGlobalFiles Files { [System.Security.SecurityCritical] get => this; }

        /// <summary>Zjištìní cesty k obrázku pro logo, pokud je obrázek globálnì pøesmìrováván</summary>
        [System.Security.SecurityCritical]
        public virtual IGReportGlobalFile GetZnakFileName(GString ico = null)
        {
            if (Configuration?.GinisPath == null) return null;
            string l_frm = Path.Combine(Configuration.GinisPath, "FRM");
            string l_fn;
            if (ico != null && !ico.IsNull)
            {
                l_fn = Path.Combine(l_frm, $"znak-m-{ico.BaseValue}.bmp");
                if (System.IO.File.Exists(l_fn))
                    return new GReportGlobalRealFile(l_fn);

            }
            l_fn = Path.Combine(l_frm, "znak-m.bmp");
            if (System.IO.File.Exists(l_fn))
                return new GReportGlobalRealFile(l_fn);

            //"c:\Program Files\GORDIC\GINIS\FRM\gordic_logo.png" 
            l_fn = Path.Combine(l_frm, "gordic_logo.png");
            if (System.IO.File.Exists(l_fn))
                return new GReportGlobalRealFile(l_fn);

            return null;
        }

        [System.Security.SecurityCritical]
        public abstract void BeginFormatting(IGReport r, string ixs_frm, string format_group, string bridge);

        [System.Security.SecurityCritical] 
        public abstract void EndFormatting(IGReport r, Exception e);

    }

}
