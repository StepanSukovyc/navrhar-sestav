//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IPreviewHandler.cs                     </Name>
//    <Description> Náhled pohledu na sestavu                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Náhled pohledu na sestavu
    /// </summary>
    public interface IPreviewHandler
    {
        /// <summary>
        /// Indiuje dostupnost úprav náhledu
        /// </summary>
        bool EnablePreviewEdit { get; }

        /// <summary>
        /// Náhled
        /// </summary>
        void Preview();
        /// <summary>
        /// úprava souborů náhledu
        /// </summary>
        void PreviewEdit();
    }
}
