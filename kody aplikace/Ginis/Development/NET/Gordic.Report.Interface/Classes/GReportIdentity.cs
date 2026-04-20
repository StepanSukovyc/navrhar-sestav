//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.GReportIdentity.cs                  </Name>
//    <Description> Identita reportu - lze uschovat pro pozdìjší znovunalezení  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2012                            </Copyright>
//    <Created>     2011-04-26                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Text;

namespace Gordic.Report.Interface
{
    /// <summary>
    /// Identita reportu - lze uschovat pro pozdìjší znovunalezení
    /// </summary>    [Serializable]
    public struct GReportIdentity
    {
        /// <summary>
        /// PID stromu
        /// </summary>
        public string ixs_str;

        /// <summary>
        /// PID sestavy
        /// </summary>
        public string ixs_alv;

        /// <summary>
        /// PID formatu
        /// </summary>
        public string ixs_frm;

        /// <summary>
        /// Pøíznak, zda došlo k dohledání z vazební tabulky strom->format
        /// </summary>
        public bool fromFos;

        /// <summary>
        /// Identifikace textových sestav
        /// </summary>
        /// <param name="ixs_str">strom</param>
        /// <param name="ixs_alv">sestava</param>
        public GReportIdentity(string ixs_str, string ixs_alv)
        {
            this.ixs_str = ixs_str;
            this.ixs_alv = ixs_alv;
            this.ixs_frm = "";
            this.fromFos = false;
        }
        /// <summary>
        /// Identifikace grafických sestav
        /// </summary>
        /// <param name="ixs_str">strom</param>
        /// <param name="ixs_alv">sestava</param>
        /// <param name="ixs_frm">formát</param>
        /// <param name="fromFos">pøíznak fos (vìtšinou false)</param>
        public GReportIdentity(string ixs_str, string ixs_alv, string ixs_frm, bool fromFos)
        {
            if (ixs_str == null) ixs_str = "";
            this.ixs_str = ixs_str;
            this.ixs_alv = ixs_alv;
            this.ixs_frm = ixs_frm;
            this.fromFos = fromFos;
        }
        /// <summary>
        /// Konstruktor ze stringové reprezentace (viz <see cref="ToString"/>)
        /// </summary>
        /// <param name="s">string</param>
        public GReportIdentity(string s)
        {
            string[] l_spl = s.Split('/');
            switch (l_spl.Length)
            {
                case 1: //pouze ALV ?
                    ixs_str = "";
                    ixs_alv = l_spl[0];
                    ixs_frm = "";
                    fromFos = false;
                    if (ixs_alv == "empty") ixs_alv = "";
                    break;
                case 2:
                    ixs_str = l_spl[0];
                    ixs_alv = l_spl[1];
                    ixs_frm = "";
                    fromFos = false;
                    break;
                case 4:
                    ixs_str = l_spl[0];
                    ixs_alv = l_spl[1];
                    ixs_frm = l_spl[2];
                    fromFos = l_spl[3] == "1";
                    break;
                default:
                    throw new Gordic.General.GArgumentException(21000002);
            }
            if (ixs_str.Length > 0)
                if (ixs_str.Length != 12 || ixs_str.Substring(4, 3) != "STR")
                    throw new Gordic.General.GArgumentException(21000003);
            if (ixs_alv.Length > 0)
                if (ixs_alv.Length != 12 || ixs_alv.Substring(4, 3) != "ALV")
                    throw new Gordic.General.GArgumentException(21000004);
            if (ixs_frm.Length > 0)
                if (ixs_frm.Length != 12 /*|| ixs_frm.Substring(4, 3) != "ALF" rozvoleni kontroly na format identifikace formatu (ixs_frm)*/)
                {
                    if (ixs_alv == GReportConsts.OperatingPrintIxsAlv) return; //vyjimka pro operativni tisky
                    throw new Gordic.General.GArgumentException(21000005);
                }
        }

        /// <summary>
        /// Pøevede do stringu. Lze z nìj opìt pøevést zpìt. Pro úschovu v db, datasetu apod.
        /// </summary>
        /// <returns>string</returns>
        public override string ToString()
        {
            if (IsEmpty) return "empty";
            if (ixs_frm.Length > 0)
                return ixs_str + "/" + ixs_alv + "/" + ixs_frm + "/" + (fromFos ? "1" : "0");
            if (ixs_str.Length > 0)
                return ixs_str + "/" + ixs_alv;
            return ixs_alv;
        }

        /// <exclude/>
        public override bool Equals(object obj)
        {
            if (obj is GReportIdentity)
                return this == (GReportIdentity)obj;
            return false;
        }

        /// <exclude/>
        public override int GetHashCode()
        {
            if (IsEmpty) return 0;
            return ixs_str.GetHashCode() + ixs_alv.GetHashCode() + ixs_frm.GetHashCode() + fromFos.GetHashCode();
        }

        /// <exclude/>
        public static bool operator ==(GReportIdentity a, GReportIdentity b)
        {
            return (a.ixs_str == b.ixs_str) && (a.ixs_alv == b.ixs_alv) && (a.ixs_frm == b.ixs_frm) && (a.fromFos == b.fromFos);
        }

        /// <exclude/>
        public static bool operator !=(GReportIdentity a, GReportIdentity b)
        {
            return !(a == b);
        }

        /// <summary>Pøíznak prázdné identity</summary>
        public bool IsEmpty
        {
            get { return ixs_alv == null || ixs_alv.Length == 0; }
        }

    }
}
