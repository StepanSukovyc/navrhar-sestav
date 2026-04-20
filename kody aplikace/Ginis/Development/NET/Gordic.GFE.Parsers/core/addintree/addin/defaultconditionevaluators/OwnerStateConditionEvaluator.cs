//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.OwnerStateConditionEvaluator.cs        </Name>
//    <Description> Nástroj na hodnocení podmínky, který porovnává stav volajícího s určitou hodnotou.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-11                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Rozhraní stavů
    /// </summary>
    public interface IOwnerState
    {
        /// <summary>
        /// Vnitřní stav
        /// </summary>
        Enum InternalState { get; }
    }

    /// <summary>
    /// Nástroj na hodnocení podmínky, který porovnává stav volajícího s určitou hodnotou.
    /// Volající musí aplikovat rozhraní <see cref="IOwnerState"/>.
    /// </summary>
    public class OwnerStateConditionEvaluator : IConditionEvaluator
    {
        /// <summary>
        /// Kontrola platností podmínky
        /// </summary>
        /// <param name="caller">Volající</param>
        /// <param name="condition">Podmínka</param>
        /// <returns></returns>
        public bool IsValid(object caller, Condition condition)
        {
            if (caller is IOwnerState)
            {
                try
                {
                    System.Enum state = ((IOwnerState)caller).InternalState;
                    System.Enum conditionEnum = (System.Enum)Enum.Parse(state.GetType(), condition.Properties["ownerstate"]);

                    int stateInt = Int32.Parse(state.ToString("D"));
                    int conditionInt = Int32.Parse(conditionEnum.ToString("D"));

                    return (stateInt & conditionInt) > 0;
                }
                catch (Exception)
                {
                    throw new ApplicationException(string.Format(GResources.GetResourceText(29450118) + " '{0}'. " + GResources.GetResourceText(29450119), condition.Properties["state"])); //RC 29450119 : Hodnota není platná!
                }
            }
            return false;
        }
    }
}
