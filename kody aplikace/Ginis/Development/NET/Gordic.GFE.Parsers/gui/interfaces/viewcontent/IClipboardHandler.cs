//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IClipboardHandler.cs                     </Name>
//    <Description> Rozhraní pro operaci editovatelností                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Rozhraní pro operaci editovatelností 
    /// </summary>
    public interface IClipboardHandler
    {
        /// <summary>
        /// Lze vyjmout
        /// </summary>
        bool EnableCut { get; }
        /// <summary>
        /// Lze kopírovat
        /// </summary>
        bool EnableCopy { get; }
        /// <summary>
        /// Lze vkládat
        /// </summary>
        bool EnablePaste { get; }
        /// <summary>
        /// Lze odstranit
        /// </summary>
        bool EnableDelete { get; }
        /// <summary>
        /// Lze vybrat vše
        /// </summary>
        bool EnableSelectAll { get; }

        /// <summary>
        /// Akce na odstranění výběru
        /// </summary>
        void Delete();
        /// <summary>
        /// Akce na vyjmutí objektu
        /// </summary>
        void Cut();
        /// <summary>
        /// Akce na kopírování objektu
        /// </summary>
        void Copy();
        /// <summary>
        /// Akce na vložení objektu
        /// </summary>
        void Paste();
        /// <summary>
        /// Reakce na Vybrat vše
        /// </summary>
        void SelectAll();
    }
}
