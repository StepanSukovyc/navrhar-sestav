//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IGrrDocumentView.cs                    </Name>
//    <Description> Rozhraní pohledu na GRR dokument                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns;

namespace Gordic.GFE.WinClient.Editor
{
    /// <summary>
    /// Rozhraní pohledu na GRR dokument
    /// </summary>
    interface IGrrDocumentView : IDocumentView
    {
        /// <summary>
        /// GRR dokument
        /// </summary>
        GrrFormationDocument Document { get; }
    }
}
