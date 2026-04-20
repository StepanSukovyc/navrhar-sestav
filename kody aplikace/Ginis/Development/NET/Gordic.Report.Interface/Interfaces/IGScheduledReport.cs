//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGScheduledReport.cs                </Name>
//    <Description> obecná obsluha odloženého zpracování sestav                 </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2011-04-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;

#if NETFRAMEWORK
#else
namespace Gordic.Adu.Interface
{
    public class GEventsDataset
    {
        public class ScheduledEventsRow {}
    }
}
#endif


namespace Gordic.Report.Interface
{
    /// <summary>
    /// obecná obsluha odloženého zpracování sestav
    /// </summary>
    [ActivatedObject("Gordic.Report.Server.GScheduledReport")]
    [System.Security.SecurityCritical]
    public interface IGScheduledReport
    {
        /// <summary>
        /// TODO
        /// </summary>
        void PrepareScheduled(IGReport report, GScheduledReportDataSet.ScheduledReportRow srep);

        /// <summary>
        /// TODO
        /// </summary>
        void ReadScheduledParameters(IGReport report, GScheduledReportParameter[] parameters);

        /// <summary>
        /// TODO
        /// </summary>
        void SaveToDb(GScheduledReportDataSet srep, Gordic.Adu.Interface.GEventsDataset.ScheduledEventsRow sched, IGReport report);

        /// <summary>
        /// APG Ready SaveToDb
        /// </summary>
        void SaveToDb(GScheduledReportDataSet srep, ref Gordic.Adu.Interface.GEventsDataset.ScheduledEventsRow sched, GReportDto report);

        /// <summary>
        /// TODO
        /// </summary>
        void ReadDb(Gordic.Adu.Interface.GEventsDataset.ScheduledEventsRow sched, GReportSource source, out GScheduledReportDataSet srep, out IGReport report);

        /// <summary>
        /// APG ready ReadDb
        /// </summary>
        void ReadDb(Gordic.Adu.Interface.GEventsDataset.ScheduledEventsRow sched, GReportSource source, out GScheduledReportDataSet srep, out GReportDto report);

        /// <summary>
        /// TODO
        /// </summary>
        void ReadDb(GString ixs_poz, GReportSource source, out GScheduledReportDataSet srep, out IGReport report);

        /// <summary>
        /// TODO
        /// </summary>
        void ReadInfo(Gordic.Adu.Interface.GEventsDataset.ScheduledEventsRow sched, out GScheduledReportDataSet srep);

        /// <summary>
        /// Testovací spuštení požadavku (lokální)
        /// </summary>
        void TestScheduledRun(GString ixs_poz, GString id_uda);

        /// <summary>vložení/vyjmutí z/do balíku</summary>
        void VlozitDoBaliku(GString IxsPoz, GInt32 PorCisKud, GString Balik_IxsPoz, GInt32 Balik_PorCisKud);

        /// <summary>konverze - zjisteni chybejicich parametru</summary>
        string Convert(GString ixs_poz);
    }
}
