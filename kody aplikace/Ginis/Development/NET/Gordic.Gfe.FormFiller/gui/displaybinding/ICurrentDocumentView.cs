//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.ICurrentDocumentView.cs               </Name>
//    <Description> Rozhraní pohledu na GRF dokument                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Gordic.GFE.Parsers.AddIns;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Rozhraní pohledu na GRF dokument
    /// </summary>
    interface ICurrentDocumentView : IDocumentView
    {
        /// <summary>
        /// GRF dokument
        /// </summary>
        DocfrmFormationDocument Document { get; }
    }
}
