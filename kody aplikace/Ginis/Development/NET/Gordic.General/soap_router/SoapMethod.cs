//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.SoapMethod.cs                                </Name>
//    <Description> SOAP ,,method'' proxy                                       </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-02-11                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.General;

/// <summary>
/// SOAP ,,method'' proxy
/// </summary>
public abstract class SoapMethod
{
    /// <summary>
    /// Request object
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    public abstract object Invoke(object request);

    /// <summary>
    /// Return parameter type
    /// </summary>
    public abstract Type ParameterType
    {
        get;
    }
}