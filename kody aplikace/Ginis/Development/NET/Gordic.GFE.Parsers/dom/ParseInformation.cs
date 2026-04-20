//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ParseInformation.cs                      </Name>
//    <Description> Informace o obsahu analyzovaného souboru                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Binding;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Informace o obsahu analyzovaného souboru
    /// </summary>
    public class ParseInformation
    {
        /// <summary>
        /// podporovaný formát
        /// </summary>
        public SupportedFormats Format { get; set; }
        /// <summary>
        /// Poslední validní kompilovaná jednotka
        /// </summary>
        public ICompilationUnit ValidCompilationUnit { get; private set; }
        /// <summary>
        /// Pozměněná kompilovaná jednotka
        /// </summary>
        public ICompilationUnit DirtyCompilationUnit { get; private set; }
        /// <summary>
        /// Poslední kompilovaná jednotka
        /// </summary>
        public ICompilationUnit MostRecentCompilationUnit { get; private set; }
        /// <summary>
        /// Nejlepší kompilovaná jednotka
        /// </summary>
        public ICompilationUnit BestCompilationUnit { get; private set; }

        /// <summary>
        /// Použítí jednotky zadané kompilace.
        /// </summary>
        /// <param name="unit">Kompilovaná jednotka</param>
        public void SetCompilationUnit(ICompilationUnit unit)
        {
            lock (this)
            {
                MostRecentCompilationUnit = unit;

                if (unit.ErrorsDuringCompile)
                {
                    DirtyCompilationUnit = unit;
                    if (ValidCompilationUnit == null)
                        BestCompilationUnit = unit;
                }
                else
                {
                    ValidCompilationUnit = unit;
                    BestCompilationUnit = unit;
                    DirtyCompilationUnit = null;
                }
            }
        }

        /// <summary>
        /// prázdný konnstruktor
        /// </summary>
        public ParseInformation()
        {
            Format = SupportedFormats.None;
        }

        /// <summary>
        /// konstruktor třídy dle formátu
        /// </summary>
        /// <param name="format"></param>
        public ParseInformation(SupportedFormats format)
        {
            Format = format;
        }
    }
}
