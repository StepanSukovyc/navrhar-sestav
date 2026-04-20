//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GDtoArrayFilter.cs      </Name>
//    <Description> Filtr nesouci pole DTO                                      </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2018-11-29                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>Filtr nesouci pole DTO</summary>
    [DebuggerDisplay("{FilterId} {Dtos}")]
    public class GDtoArrayFilter<TFilterId> : GFilter<TFilterId> where TFilterId : Enum
    {
        /// <summary>Pole DTO</summary>
        public IGDto[] Dtos { get; set; }

        /// <summary>Ctor</summary>
        public GDtoArrayFilter(TFilterId id, IGDto[] dtos)
        {
            FilterId = id;
            Dtos = dtos;
        }
    }
}
