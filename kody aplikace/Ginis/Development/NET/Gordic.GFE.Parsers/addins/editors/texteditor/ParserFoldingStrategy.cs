//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ParserFoldingStrategy.cs                 </Name>
//    <Description> Skládací strategie                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.Dom;
using Gordic.TextEditor.Document;

namespace Gordic.GFE.Parsers.DefaultEditor
{
    /// <summary>
    /// Skládací strategie
    /// </summary>
    public class ParserFoldingStrategy : IFoldingStrategy
    {
        /// <summary>
        /// Vypočítá Fold úroveň konkretního řádku.
        /// </summary>
        /// <param name="document">Dokument s obsahem</param>
        /// <param name="fileName">Název souboru</param>
        /// <param name="parseInfo">Informace o obsahu</param>
        /// <returns></returns>
        public List<FoldMarker> GenerateFoldMarkers(IDocument document, string fileName, object parseInfo)
        {
            if (!(parseInfo is ParseInformation parseInformation) || parseInformation.MostRecentCompilationUnit == null)
                return null;
            List<FoldMarker> foldMarkers = GetFoldMarkers(document, parseInformation.MostRecentCompilationUnit);
            if (parseInformation.BestCompilationUnit != parseInformation.MostRecentCompilationUnit)
            {
                List<FoldMarker> oldFoldMarkers = GetFoldMarkers(document, parseInformation.BestCompilationUnit);
                int lastLine = (foldMarkers.Count == 0) ? 0 : foldMarkers[foldMarkers.Count - 1].EndLine;
                int totalNumberOfLines = document.TotalNumberOfLines;
                foreach (FoldMarker marker in oldFoldMarkers)
                    if (marker.StartLine > lastLine && marker.EndLine < totalNumberOfLines)
                        foldMarkers.Add(marker);
            }
            return foldMarkers;
        }

        List<FoldMarker> GetFoldMarkers(IDocument document, ICompilationUnit cu)
        {
            List<FoldMarker> foldMarkers = new List<FoldMarker>();

            //bool firstTime = document.FoldingManager.FoldMarker.Count == 0;
            //foreach (FoldingRegion foldingRegion in cu.FoldingRegions)
            //    foldMarkers.Add(new FoldMarker(document, foldingRegion.Region.BeginLine - 1, foldingRegion.Region.BeginColumn - 1,
            //                                   foldingRegion.Region.EndLine - 1, foldingRegion.Region.EndColumn - 1, FoldType.Region, foldingRegion.Name, firstTime));

            //if (cu.DokuComments != null)
            //    foreach (IComment c in cu.DokuComments)
            //        foldMarkers.Add(new FoldMarker(document, c.Region.BeginLine - 1, c.Region.BeginColumn - 1,
            //                                       c.Region.EndLine - 1, c.Region.EndColumn - 1));
            return foldMarkers;
        }
    }
}
