//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.CompilationService.cs                    </Name>
//    <Description> Služba pro práci se zkontrolovanými jednotkami               </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.Binding;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// Služba pro práci s zkontrolovanými jednotkami
    /// </summary>
    public static class CompilationService
    {
        static Dictionary<OpenedFile, ICompilationUnit> units = new Dictionary<OpenedFile, ICompilationUnit>();
        /// <summary>
        /// Kolekce kompilovaných jednotek otevřeného souboru
        /// </summary>
        public static Dictionary<OpenedFile, ICompilationUnit> Units { get { return units; } }

        /// <summary>
        /// Inicializace jednotky
        /// </summary>
        /// <param name="file">Otevřený soubor jednotky</param>
        public static void InitializeUnit(OpenedFile file)
        {
            if (!units.ContainsKey(file))
            {
                ParseInformation parseInformation = ParserService.GetParseInformation(file.FileName);
                ICompilationUnit unit = null;
                if (parseInformation != null)
                    unit = parseInformation.ValidCompilationUnit;

                if (unit == null)
                    unit = new CompilationUnit();

                if (file != null && unit.OpenedFile == null)
                    unit.OpenedFile = file;

                Units.Add(file, unit as CompilationUnit);
            }
        }
        /// <summary>
        /// Odstranění kompilační jednotky ze seznamu
        /// </summary>
        /// <param name="file">Otevřený soubor jednotky</param>
        public static void UnInitializeUnit(OpenedFile file)
        {
            if (units.ContainsKey(file))
                units.Remove(file);
        }
    }
}
