//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.UnknownProjectItem.cs                  </Name>
//    <Description> Neznámý typ položky projektu                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-25                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns.Project;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Neznámý typ položky projektu
    /// </summary>
    class UnknownProjectItem : ProjectItem
    {
        internal UnknownProjectItem(IProject project, IProjectSection item)
            : base(project, item)
        {
        }

        internal UnknownProjectItem(IProject project, ItemType itemType, string include)
            : base(project, itemType, include)
        {
        }

    }
}
