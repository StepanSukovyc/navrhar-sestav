//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGSplException.cs                            </Name>
//    <Description> Společné prvky GFatalSplException a GNonFatalSplException   </Description>
//    <Author>      FFIALA                                                      </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-03-27                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>
    /// Společné prvky GFatalSplException a GNonFatalSplException
    /// </summary>
    public interface IGSplException
    {
        /// <summary>
        /// Vrátí novou instanci vnitřního stavového objektu se základní sadou hodnot vrácených ze SPG 
        /// FFIALA 2018-04-30
        /// </summary>
        GSplError SplError { get; }

        /// <summary>název databázové procedury v níž chyba nastala</summary>
        string ProcedureName { get; }

        /// <summary>číslo chyby</summary>
        int ErrCode { get; }

        /// <summary>číslo sql chyby</summary>
        int SqlErr { get; }

        /// <summary>číslo isam chyby</summary>
        int IsamErr { get; }

        /// <summary>text chyby bez rozdělení na uživatelskou a technologickou část</summary>
        string TxtErr { get; }

        /// <summary>lokace chyby</summary>
        string LokErr { get; }
        
        /// <summary>příznak fatální chyby</summary>
        bool FatalError { get; }

        /// <summary>technologický text chyby</summary>
        string FatalErrorText { get; }
        
        /// <summary>uživatelský text chyby</summary>
        string UserErrorText { get; }
    }
}
