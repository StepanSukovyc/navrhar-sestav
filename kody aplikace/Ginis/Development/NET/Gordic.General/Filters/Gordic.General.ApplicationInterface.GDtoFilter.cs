//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.ApplicationInterface.GDtoFilter.cs           </Name>
//    <Description> GFiltr nesouci DTO                                          </Description>
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
    /// <summary>GFiltr nesouci DTO</summary>
    public interface IGDtoFilter : IGFilter
    {
        /// <summary>Dto</summary>
        IGDto Dto { get; /*set;*/ }
    }

    /// <summary>GFiltr nesouci DTO</summary>
    [DebuggerDisplay("{FilterId} {Dto}")]
    public class GDtoFilter<TFilterId> : GFilter<TFilterId>, IGDtoFilter where TFilterId : Enum
    {
        /// <summary>Dto</summary>
        public IGDto Dto { get; set; }

        /// <summary>Ctor</summary>
        public GDtoFilter(TFilterId id, IGDto dto)
        {
            FilterId = id;
            Dto = dto;
        }
        /// <summary>Ctor</summary>
        public GDtoFilter()
        {
        }
        /// <summary>Ctor</summary>
        public GDtoFilter(TFilterId filterId)
        {
            FilterId = filterId;
        }
        ///<summary>True, pokud je filtr zakázán nebo neobsahuje žádnou hodnotu</summary>
        public override bool IsEmpty => !Enabled || Dto == null;

    }
}
