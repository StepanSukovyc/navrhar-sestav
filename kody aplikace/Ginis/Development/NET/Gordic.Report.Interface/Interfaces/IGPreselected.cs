//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Report.Interface.IGPreselected.cs                    </Name>
//    <Description> Seznam pøednastavených                                      </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2011                            </Copyright>
//    <Created>     2011-04-26                                                  </Created>
//  </FileHeader>

using System;
using Gordic.General;
using Gordic.General.ApplicationInterface;

namespace Gordic.Report.Interface
{

    /// <summary>Seznam pøednastavených</summary>
    [ActivatedObject("Gordic.Report.Server.GPreselected")]
    [System.Security.SecurityCritical]
    public interface IGPreselected
    {
        /// <summary>Seznam pøednastavených</summary>
        ListOfPreselectedDataset ListOfPreselectedReports(params GFilter<FilterPreselectedReports>[] filters);
    }

    /// <summary>Parametry pro ètení a zápis pøednastavených</summary>
    public class GPreselectedParams
    {
        bool Bool;

        /// <summary>Rok</summary>
        public string Rok;

        /// <exclude/>
        public GPreselectedParams(bool b)
        {
            this.Bool = b;
        }

        /// <summary>Pøevod do boolu</summary>
        public static implicit operator bool(GPreselectedParams p)
        {
            return p.Bool;
        }
        /// <summary>Pøevod z boolu</summary>
        public static implicit operator GPreselectedParams(bool b)
        {
            return new GPreselectedParams(b);
        }
    }

    /// <summary>
    /// Filtr na pøedvybrané sestavy k tématu
    /// </summary>
    public enum FilterPreselectedReports
    {
        /// <summary>
        /// Fáze
        /// </summary>
        faze,
    };
}
