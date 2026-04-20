//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ICondition.cs                            </Name>
//    <Description> Rozhraní pro jednoduché nebo komplexní podmínky.            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-10                                                  </Created>
//  </FileHeader>

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Výchozí akce pro případ selhaní podmínky
    /// </summary>
    public enum ConditionFailedAction
    {
        /// <exclude/>
        Nothing,
        /// <exclude/>
        Exclude,
        /// <exclude/>
        Disable
    }

    /// <summary>
    /// Rozhraní pro jednoduché nebo komplexní podmínky.
    /// </summary>
    public interface ICondition
    {
        /// <summary>
        /// Název podmínky
        /// </summary>
        string Name
        {
            get;
        }

        /// <summary>
        /// Vrácí akci pro nesplnění podmínky
        /// </summary>
        ConditionFailedAction Action
        {
            get;
            set;
        }

        /// <summary>
        /// Vrácí true, když podmínka je validní jinak false.
        /// </summary>
        /// <param name="caller">Volající vlastník</param>
        bool IsValid(object caller);
    }
}
