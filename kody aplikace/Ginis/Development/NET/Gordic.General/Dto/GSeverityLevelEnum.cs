//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GSeverityLevelEnum.cs                        </Name>
//    <Description> Uroven vaznosti                                             </Description>
//    <Author>      bmartinek                                                   </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2019-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gordic.General
{
    /// <summary>Uroven vaznosti</summary>
    public enum GSeverityLevelEnum : short
    {
        /// <summary>Info</summary>
        Info = 0,

        /// <summary>Warning</summary>
        Warning,

        /// <summary>Error</summary>
        Error,

        /// <summary>Success</summary>
        Success,

        /// <summary>Important</summary>
        Important
    }
}
