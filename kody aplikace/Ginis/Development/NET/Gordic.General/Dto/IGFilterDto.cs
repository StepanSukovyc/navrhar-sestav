//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.IGFilterDto.cs                               </Name>
//    <Description> IFace indikujici DTO objekt pro filtrování                  </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2017-03-22                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General
{
    /// <summary>IFace indikujici DTO objekt pro filtrování</summary>
    public interface IGFilterDto<TFilterId> : IGDto where TFilterId: Enum
    {
    }
}
