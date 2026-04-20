//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportConsts.cs                    </Name>
//    <Description> Třída pro veřejné konstanty                                 </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2009                  </Copyright>
//    <Created>     2009-06-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;
using Gordic.General;
using System.Reflection;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Třída pro veřejné konstanty
    /// </summary>
    public static class GReportConsts
    {
        /// <summary>fiktivní identifikace neexistujícího ALV pro Operativní tisk</summary>
        public const string OperatingPrintIxsAlv = "0000ALVO0000";
        /// <summary>Název položky pro Operativní tisk</summary>
        public static string OperatingPrintName
        {
            get
            {
                return GResources.GetResourceText(Assembly.GetExecutingAssembly(), 4); //RC 4 : Operativní tisk
            }
        }

        /// <summary>fiktivní identifikace neexistujícího FRM pro Operativní tisk</summary>
        public const string OperatingPrintFrm_Normal = "1";
        /// <summary>fiktivní identifikace neexistujícího FRM pro Operativní tisk</summary>
        public const string OperatingPrintFrm_Excel = "2";
        /// <summary>fiktivní identifikace neexistujícího FRM pro Operativní tisk</summary>
        public const string OperatingPrintFrm_Multiline = "3";

        /// <summary>seznam všech dostupných FRM pro Operativní tisk</summary>
        public static string[] OperatingPrintFrms = { OperatingPrintFrm_Normal, OperatingPrintFrm_Multiline };

        /// <summary>Název položky pro Operativní tisk</summary>
        public static string OperatingPrintFrmName(string frm)
        {
            switch (frm)
            {
                case OperatingPrintFrm_Normal:
                    return GResources.GetResourceText(Assembly.GetExecutingAssembly(), 21); //RC 21 : Standardní
                case OperatingPrintFrm_Excel:
                    return GResources.GetResourceText(Assembly.GetExecutingAssembly(), 22); //RC 22 : Pro Excel
                case OperatingPrintFrm_Multiline:
                    return GResources.GetResourceText(Assembly.GetExecutingAssembly(), 23); //RC 23 : Víceřádková
                default:
                    return "";
            }
        }

    }

    /// <summary>
    /// Třída konstant s možnými parametry sestavy
    /// </summary>
    public class GReportParams
    {
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0000 = "X0000";
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0001 = "X0001";
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0002 = "X0002";
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0003 = "X0003";
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0004 = "X0004";
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0005 = "X0005";
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0006 = "X0006";
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0007 = "X0007";
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0008 = "X0008";
        /// <summary> stadnardní parametr sestav </summary>
        public static string X0009 = "X0009";
        /// <summary> vytváří log soubor na c:\ ... pouze pro účely ladění </summary>
        public static string Make_Log = "Make_Log";
        /// <summary> Zde je možno uložit DataTable s daty pro speciální sestavy nebo pro operativní tisky </summary>
        public static string DataTable = "DATATABLE";
        /// <summary> Formátování DataTable </summary>
        public static string ColumnList = "COLUMNLIST";
        /// <summary> Nadpis operativního tisku </summary>
        public static string Header = "HEADER";
    };

}
