//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGGinlses.cs                        </Name>
//    <Description> Historie tisků                                              </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2011-04-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Historie tisků
    /// </summary>
    [ActivatedObject("Gordic.Report.Server.GGinlses")]
    [System.Security.SecurityCritical]
    public interface IGGinlses
    {
        /// <summary>
        /// Historie tisků
        /// </summary>
        GGinlsesDataSet.SeznamDataTable HistorieTisku(params GFilter<FilterGinlses>[] filters);

        /// <summary>
        /// Vlastní zápis do historie tisků
        /// </summary>
        void LogCustomMessage(GGinlsesDataSet.SeznamRow rowToLog);

        /// <summary>
        /// Vlastní zápis do historie tisků
        /// </summary>
        void LogCustomMessage(ref GInt32 porcislo, GString ixsAlv = null, GString ixsTsk = null, GString ixsFrm = null, GString vystSoubor = null
            , string text = "", string poznamka = "", int alvcode = -1, short stav = -1, GString ixb = null
            , GString ixp = null, GDateTime datStart = null, GDateTime datGen = null, GDateTime datFormat = null);

        void LogFormatBegin(ref GGinlsesReportInfo reportInfo, string fmt);
        void LogFormatSuccess(ref GGinlsesReportInfo reportInfo);
        void LogFormatError(ref GGinlsesReportInfo reportInfo, Exception e);
    }

    public class GGinlsesReportInfo : GReportMinimalInfoDto
    {
        public GInt32 PorCislo;
        public GString IxsTsk;
        public GString IxsFrm;
        public GString Ixp;
        public GDateTime DatStart;
        public GDateTime DatGen;
        public GDateTime DatFormat;        public static new GGinlsesReportInfo FromReport(IGReport report)
        {
            return new GGinlsesReportInfo() {
                IxsAlv = GString.Parse(report.CommonInfos["IXS_ALV"], true),
                IdSes = GString.Parse(report.CommonInfos["ID_SES"], true),
                DatModif = GString.Parse(report.CommonInfos["DAT_MODIF"], true),

                IxsTsk = GString.Parse(report.CommonInfos["IXS_TSK"], true),
                IxsFrm = GString.Parse(report.CommonInfos["IXS_FRM"], true),

                Ixp = GString.Parse(report.Parameters["IXP"], true),
                DatStart = GDateTime.Parse(report.CommonInfos["dat_start"], true),
                DatGen = GDateTime.Parse(report.CommonInfos["dat_gen"], true),
                DatFormat = GDateTime.Parse(report.CommonInfos["dat_format"], true),

                PorCislo = (GInt32)report.CommonInfos["ginlses_porcislo"] ?? GInt32.Null,
            };
        }        public void ToReport(IGReport report)
        {
            if (PorCislo.IsBlank() == false) report.CommonInfos["ginlses_porcislo"] = PorCislo;
            if (DatFormat.IsBlank() == false) report.CommonInfos["dat_format"] = DatFormat.BaseValue;
        }
    }

    /// <summary>
    /// Filtr pro Historii tisků
    /// </summary>
    public enum FilterGinlses
    {
        /// <exclude/>
        lic,
        /// <exclude/>
        log_por_cislo,
        /// <exclude/>
        faze,
        /// <exclude/>
        ixs_alv,
        //ixs_tsk,
        /// <exclude/>
        ixs_frm,
        //vyst_soubor,
        //alv_code,
        //alv_errtext,
        //stav_gen,
        //poznamka,
        /// <exclude/>
        dat_zmena,
        /// <exclude/>
        zmenu_prov,
        /// <exclude/>
        ixp,
        /// <exclude/>
        por_cislo,
        //dat_start,
        //dat_gen,
        //dat_format,
        /// <summary>Všechny ixs_zmp této funkce</summary>
        ixs_fun,
        /// <summary>ixb</summary>
        ixb,
    }

}
