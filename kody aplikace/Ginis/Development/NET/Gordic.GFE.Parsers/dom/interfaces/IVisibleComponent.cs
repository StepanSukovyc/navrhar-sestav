//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IVisibleComponent.cs                     </Name>
//    <Description> Komponenta s viditelností                                   </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-10-11                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Komponenta s viditelností
    /// </summary>
    public interface IVisibleComponent
    {
        /// <summary>viditelnost komponenty</summary>
        bool Visible
        {
            get;
            set;
        }
        void BeginUpdate();
        void EndUpdate();
    }
}
