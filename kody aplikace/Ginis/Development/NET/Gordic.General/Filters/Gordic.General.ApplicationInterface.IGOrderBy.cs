//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.IGOrderBy.cs            </Name>
//    <Description> OrderBy - struktura pøedepisující jak se má øadit seznam    </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-08-09                                                  </Created>
//  </FileHeader>

using System;
using System.Data;
using Gordic.General;

namespace Gordic.General
{

    /// <summary>
    /// OrderBy - struktura pøedepisující jak se má øadit seznam
    /// </summary>
    public interface IGOrderBy
    {
        /// <summary>Identifikace sloupce - vazba mezi prezenèní a aplikaèní logikou</summary>
        string Column { get; }
        ///<summary>Smìr øazení (sestupnì/vzestupnì)</summary>
        OrderDirection Direction { get; }
    }
}
