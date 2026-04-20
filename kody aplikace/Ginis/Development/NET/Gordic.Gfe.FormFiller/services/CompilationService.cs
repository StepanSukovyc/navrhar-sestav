//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.CompilationService.cs                 </Name>
//    <Description> Služba pro práci s zkontrolovanými jednotkami               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.Gfe.FormFiller.AddIns;
using Gordic.GFE.Parsers.Services;

namespace Gordic.Gfe.FormFiller
{
    /// <summary>
    /// Služba pro práci s zkontrolovanými jednotkami
    /// </summary>
    static class CompilationService
    {
        static Dictionary<OpenedFile, AlfCompilationUnit> units = new Dictionary<OpenedFile, AlfCompilationUnit>();
        /// <summary>
        /// Kolekce kompilovaných jednotek otevřeného souboru
        /// </summary>
        public static Dictionary<OpenedFile, AlfCompilationUnit> Units { get { return units; } }

        /// <summary>
        /// Inicializace jednotky
        /// </summary>
        /// <param name="file">Otevřený soubor jednotky</param>
        internal static void InitializeUnit(OpenedFile file)
        {
            if (!units.ContainsKey(file))
                Units.Add(file, null);
        }
    }
}
