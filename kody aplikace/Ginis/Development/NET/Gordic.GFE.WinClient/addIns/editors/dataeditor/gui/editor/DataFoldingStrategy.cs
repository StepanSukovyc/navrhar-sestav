//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.DataFoldingStrategy.cs                 </Name>
//    <Description> skládací strategie datového souboru                         </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-15                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.StructureView;
using Gordic.TextEditor.Document;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.GFE.WinClient.DataEditor
{
    /// <summary>
    /// skládací strategie datového souboru
    /// </summary>
    class DataFoldingStrategy : IFoldingStrategy
    {
        #region IFoldingStrategy

        /// <summary>
        /// Přidá skládíní do textového editoru kolem každého start-end páru elementů.
        /// </summary>
        /// <param name="document">Dokument se kterým se pracuje</param>
        /// <param name="fileName">Název souboru dokumentu</param>
        /// <param name="parseInformation">Informace o analýze</param>
        /// <returns></returns>
        public List<FoldMarker> GenerateFoldMarkers(IDocument document, string fileName, object parseInformation)
        {
            List<FoldMarker> foldMarkers = new List<FoldMarker>();

            if (CompilationService.Units[view.PrimaryFile] is CUData cu)
            {
                StructureViewEntry svEntry = cu.StructureViewEntry as StructureViewEntry;
                if (!string.IsNullOrEmpty(document.TextContent) && svEntry != null)
                {
                    string[] splitR = document.TextContent.Split('\r');
                    if (splitR.Length != 0)
                    {
                        Stack<FoldStart> stack = new Stack<FoldStart>();
                        int endCol = 0;
                        int index = -1;
                        foreach (var item in splitR)
                        {
                            index++;
                            if (index != 0)
                            {
                                string[] splitP = item.Trim().Split('|');
                                if (!string.IsNullOrEmpty(splitP[0]))
                                {
                                    if (stack.Count == 0)
                                    {
                                        FoldStart newFoldStart = CreateElementFoldStart(splitP[0], item, index, svEntry.Structure.Root.Children.First());
                                        stack.Push(newFoldStart);
                                    }
                                    else
                                    {
                                        GFERegion bound = null;
                                        string fullName = CommonService.GetFullName(svEntry.Structure.Root, splitP[0]);
                                        if (!string.IsNullOrEmpty(fullName))
                                        {
                                            bound = CommonService.GetRegionFromStructure(svEntry.Structure, fullName);

                                            // pokud se nejedná o vnořený region, pak se jedná o konec foldingu
                                            while (stack.Count != 0)
                                            {
                                                if (fullName.Contains('.' + stack.Peek().Name + '.')
                                                || fullName.StartsWith(stack.Peek().Name + '.'))
                                                    break;

                                                FoldStart foldStart = (FoldStart)stack.Pop();
                                                CreateElementFold(document, foldMarkers, index - 1, foldStart, endCol);
                                            }
                                        }
                                        FoldStart newFoldStart = CreateElementFoldStart(splitP[0], item, index, bound);
                                        stack.Push(newFoldStart);
                                    }
                                }
                            }
                            endCol = item.Length;
                        }
                        while (stack.Count != 0)
                        {
                            FoldStart foldStart = (FoldStart)stack.Pop();
                            CreateElementFold(document, foldMarkers, index, foldStart, endCol);
                        }
                    }
                }
            }
            return foldMarkers;
        }

        /// <summary>
        /// Vytvoření XmlFoldStart pro počáteční tag elementu.
        /// </summary>
        /// <param name="regName">název aktuálního regionu</param>
        /// <param name="index">pozice řádku</param>
        /// <param name="foldText">obsah záložky</param>
        /// <param name="bound">připojený objekt</param>
        /// <returns></returns>
        FoldStart CreateElementFoldStart(string regName, string foldText, int index, object bound = null)
        {
            FoldStart newFoldStart = new FoldStart(string.Empty, regName, index, 0, bound)
            {
                FoldText = String.Concat("[", regName, "]")
            };

            return newFoldStart;
        }

        void CreateElementFold(IDocument document, List<FoldMarker> foldMarkers, int index, FoldStart foldStart, int endCol)
        {
            int endLine = index;
            if (endLine > foldStart.Line)
            {
                FoldMarker foldMarker = new FoldMarker(document, foldStart, endLine, endCol, FoldType.TypeBody);
                foldMarkers.Add(foldMarker);
            }
        }
        #endregion

        /// <summary>
        /// pohled ovladače
        /// </summary>
        IViewContent view;
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="view">pohled aktuálního ovladače</param>
        public DataFoldingStrategy(IViewContent view) { this.view = view; }
    }
}
