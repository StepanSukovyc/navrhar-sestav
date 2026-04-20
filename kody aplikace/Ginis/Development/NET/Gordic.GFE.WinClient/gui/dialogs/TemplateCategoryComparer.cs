//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TemplateCategoryComparer.cs              </Name>
//    <Description> Kategorie                                                   </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using Gordic.GFE.WinClient.Internal.Templates;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    /// Kategorie
    /// </summary>
    public interface ICategory
    {
        /// <summary>
        /// Název
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// pořadí
        /// </summary>
        int SortOrder { get; set; }
    }

    /// <summary>
    /// Seřadí kategorie ve stromě projektů/souborů.
    /// </summary>
    public class TemplateCategoryComparer : IComparer
    {
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public TemplateCategoryComparer()
        {
        }
        /// <summary>
        /// porovnání
        /// </summary>
        /// <param name="x">první argument</param>
        /// <param name="y">druhý argument</param>
        /// <returns></returns>
        public int Compare(object x, object y)
        {
            ICategory categoryX = x as ICategory;
            ICategory categoryY = y as ICategory;

            if (categoryX.SortOrder != TemplateCategorySortOrderFile.UndefinedSortOrder && categoryY.SortOrder != TemplateCategorySortOrderFile.UndefinedSortOrder)
            {
                if (categoryX.SortOrder > categoryY.SortOrder)
                    return 1;
                else if (categoryX.SortOrder < categoryY.SortOrder)
                    return -1;
            }
            else if (categoryX.SortOrder != TemplateCategorySortOrderFile.UndefinedSortOrder)
                return -1;
            else if (categoryY.SortOrder != TemplateCategorySortOrderFile.UndefinedSortOrder)
                return 1;

            return String.Compare(categoryX.Name, categoryY.Name);
        }
    }
}
