//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.IGrfCurrentDocumentView.cs                </Name>
//    <Description> Rozhraní pohledu na GRF dokument                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.WinClient.GrfEditor;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Rozhraní pohledu na GRF dokument
    /// </summary>
    interface IGrfDocumentView : IDocumentView
    {
        /// <summary>
        /// GRF dokument
        /// </summary>
        GrfFormationDocument Document { get; }
    }
}
