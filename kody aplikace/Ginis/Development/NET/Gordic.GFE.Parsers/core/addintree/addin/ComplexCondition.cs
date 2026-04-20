//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ComplexCondition.cs                      </Name>
//    <Description> Operace podmínek                          </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-21                                                  </Created>
//  </FileHeader>

using System.Diagnostics;
using System.Text;
using System.Xml;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Výsledek operace AND dvou podmínek
    /// </summary>
    public class AndCondition : ICondition
    {
        ICondition[] conditions;

        /// <summary>
        /// Název
        /// </summary>
        public string Name
        {
            get
            {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < conditions.Length; ++i)
                {
                    sb.Append(conditions[i].Name);
                    if (i + 1 < conditions.Length)
                        sb.Append(" And ");
                }
                return sb.ToString();
            }
        }

        ConditionFailedAction action = ConditionFailedAction.Exclude;
        /// <summary>
        /// Vrácí akci pro nesplnění podmínky
        /// </summary>
        public ConditionFailedAction Action
        {
            get { return action; }
            set { action = value; }
        }

        /// <summary>
        /// Násobení podmínek
        /// </summary>
        /// <param name="conditions"></param>
        public AndCondition(ICondition[] conditions)
        {
            Debug.Assert(conditions.Length >= 1);
            this.conditions = conditions;
        }

        /// <summary>
        /// Vrácí true, když podmínka je validní jinak false.
        /// </summary>
        public bool IsValid(object owner)
        {
            foreach (ICondition condition in conditions)
                if (!condition.IsValid(owner))
                    return false;

            return true;
        }

        /// <summary>
        /// Načtení podmínky
        /// </summary>
        /// <param name="reader">XmlReader</param>
        /// <returns></returns>
        public static ICondition Read(XmlReader reader)
        {
            return new AndCondition(Condition.ReadConditionList(reader, "And"));
        }
    }

    /// <summary>
    /// Podmínka negace
    /// </summary>
    public class NegatedCondition : ICondition
    {
        ICondition condition;

        /// <summary>
        /// Název
        /// </summary>
        public string Name { get { return "Not " + condition.Name; } }

        ConditionFailedAction action = ConditionFailedAction.Exclude;
        /// <summary>
        /// Vrácí akci pro nesplnění podmínky
        /// </summary>
        public ConditionFailedAction Action
        {
            get { return action; }
            set { action = value; }
        }

        /// <summary>
        /// Negace podmínky
        /// </summary>
        /// <param name="condition">Podmínka</param>
        public NegatedCondition(ICondition condition)
        {
            Debug.Assert(condition != null);
            this.condition = condition;
        }

        /// <summary>
        /// Vrácí true, když podmínka je validní jinak false.
        /// </summary>
        /// <param name="owner">Volající vlastník</param>
        public bool IsValid(object owner)
        {
            return !condition.IsValid(owner);
        }

        /// <summary>
        /// Načtení podmínky
        /// </summary>
        /// <param name="reader">XmlReader</param>
        /// <returns></returns>
        public static ICondition Read(XmlReader reader)
        {
            return new NegatedCondition(Condition.ReadConditionList(reader, "Not")[0]);
        }
    }

    /// <summary>
    /// Vrácí NEBO výsledek dvou podmínek.
    /// </summary>
    public class OrCondition : ICondition
    {
        ICondition[] conditions;

        /// <summary>
        /// Název
        /// </summary>
        public string Name
        {
            get
            {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < conditions.Length; ++i)
                {
                    sb.Append(conditions[i].Name);
                    if (i + 1 < conditions.Length)
                        sb.Append(" Or ");
                }
                return sb.ToString();
            }
        }

        ConditionFailedAction action = ConditionFailedAction.Exclude;
        /// <summary>
        /// Vrácí akci pro nesplnění podmínky
        /// </summary>
        public ConditionFailedAction Action
        {
            get { return action; }
            set { action = value; }
        }

        /// <summary>
        /// Sečtení podmínek
        /// </summary>
        /// <param name="conditions">Podmínky</param>
        public OrCondition(ICondition[] conditions)
        {
            Debug.Assert(conditions.Length >= 1);
            this.conditions = conditions;
        }

        /// <summary>
        /// Vrácí true, když podmínka je validní jinak false.
        /// </summary>
        /// <param name="owner">Volající vlastník</param>
        public bool IsValid(object owner)
        {
            foreach (ICondition condition in conditions)
                if (condition.IsValid(owner))
                    return true;

            return false;
        }

        /// <summary>
        /// Načtení podmínky
        /// </summary>
        /// <param name="reader">XmlReader</param>
        /// <returns></returns>
        public static ICondition Read(XmlReader reader)
        {
            return new OrCondition(Condition.ReadConditionList(reader, "Or"));
        }
    }

}
