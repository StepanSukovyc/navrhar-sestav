//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.SoapRoute.cs                                 </Name>
//    <Description> Legacy SOAP-route definition                                </Description>
//    <Author>      Pavel Prchal                                                </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2026                            </Copyright>
//    <Created>     2026-02-12                                                  </Created>
//  </FileHeader>


using static Gordic.General.SoapRoute;

namespace Gordic.General;

/// <summary>
/// Legacy SOAP-route definition
/// </summary>
public sealed class SoapRoute(string path, SoapActionLocation actionLocation, string action = "")
{
    public enum SoapActionLocation
    {
        Body,
        Header
    }
    public readonly SoapActionLocation ActionLocation = actionLocation;
    public readonly string Action = action;
    public readonly string Path = path;
    public override string ToString() => $"/{Path}[{Action}] - {ActionLocation}";
}

