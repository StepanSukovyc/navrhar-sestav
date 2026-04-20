//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IGroup.cs                                </Name>
//    <Description> Rozhraní skupin                                             </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Editor
{
    /// <summary>
    /// rozhraní regionu
    /// </summary>
    public interface IRegion
    {
        /// <summary>
        /// případná skupina regionu
        /// </summary>
        GroupList Group { get; }
        /// <summary>
        /// jenom když
        /// </summary>
        string OnlyIf { get; set; }
        /// <summary>
        /// filter
        /// </summary>
        string FilterOut { get; set; }
        /// <summary>
        /// filter
        /// </summary>
        string FilterIn { get; set; }
        /// <summary>
        /// řazení
        /// </summary>
        string OrderBy { get; set; }
    }
    /// <summary>
    /// Rozhraní skupin
    /// </summary>
    public interface IGroup : IParentable
    {
        /// <summary>
        /// Seskupení
        /// </summary>
        string Grouping { get; set; }
        /// <summary>
        /// Index skupiny
        /// </summary>
        int Index { get; }
        /// <summary>
        /// Název skupiny
        /// </summary>
        string Name { get; set; }
    }
}
