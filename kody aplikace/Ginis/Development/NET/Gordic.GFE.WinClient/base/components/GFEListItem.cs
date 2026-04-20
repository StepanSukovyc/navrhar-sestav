//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.GFEListItem.cs                         </Name>
//    <Description> Specifická položka                                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                             </Author>
//    <Copyright>   Copyright © GORDIC spol. s r. o. 1993-2025                  </Copyright>
//    <Created>     2009-06-26                                                  </Created>
//  </FileHeader>


using Gordic.General;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// Specifická položka
    /// </summary>
    public class GFEListItem : IGObject
    {
        /// <summary>
        /// Konstruktér
        /// </summary>
        public GFEListItem() { }

        /// <summary>
        /// Rtf formát textem
        /// </summary>
        public string RtfObject { get; set; }

        /// <summary>
        /// Index zaèátku textové prezentace objektu v originálu
        /// </summary>
        public int IndexStart { get; set; }

        /// <summary>
        /// Index konce textové prezentace objektu v originálu
        /// </summary>
        public int IndexEnd { get; set; }

    }
}
