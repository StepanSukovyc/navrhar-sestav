//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.INamedTag.cs                             </Name>
//    <Description> Komponenta se jménem                                        </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-10-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Komponenta se jménem
    /// </summary>
    public interface INamedComponent
    {
        /// <summary>Jméno komponenty</summary>
        string Name
        {
            get;
        }
        /// <summary>Třídy na komponentě (značkování)</summary>
        string Class
        {
            get;
        }
    }
}
