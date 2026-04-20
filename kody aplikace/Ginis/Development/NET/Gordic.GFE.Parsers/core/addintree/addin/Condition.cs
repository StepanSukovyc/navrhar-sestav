//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Condition.cs                             </Name>
//    <Description> Podmínka                                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Xml;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Podmínka
    /// </summary>
    public class Condition : ICondition
    {
        readonly string name;
        readonly Property properties;

        /// <summary>
        /// Vrácí akci pro nesplnění podmínky
        /// </summary>
        public ConditionFailedAction Action { get; set; }

        /// <summary>
        /// Název podmínky
        /// </summary>
        public string Name { get { return name; } }

        /// <summary>
        /// Vlastnosti dle klíče
        /// </summary>
        /// <param name="key">Klič</param>
        /// <returns></returns>
        public string this[string key] { get { return properties[key]; } }

        /// <summary>
        /// Vlastnosti podmínek
        /// </summary>
        public Property Properties { get { return properties; } }

        /// <summary>
        /// Konstrultor podmínky
        /// </summary>
        /// <param name="name">Název</param>
        /// <param name="properties">Vlastností podmínky</param>
        public Condition(string name, Property properties)
        {
            this.name = name;
            this.properties = properties;
            Action = properties.Get("action", ConditionFailedAction.Exclude);
        }

        /// <summary>
        /// Vrácí true, když podmínka je validní jinak false.
        /// </summary>
        public bool IsValid(object caller)
        {
            if (!AddInTree.ConditionEvaluators.ContainsKey(name))
                throw new CoreException(string.Format(string.Join(" ", GResources.GetResourceText(29450142), "'{0}'", GResources.GetResourceText(29450143)), name)); //RC 29450143 : nebyl nalezen!
            else
                return AddInTree.ConditionEvaluators[name].IsValid(caller, this);
        }

        /// <summary>
        /// Načtení podmínky
        /// </summary>
        /// <param name="reader">Čtečka (XmlReader)</param>
        /// <returns></returns>
        public static ICondition Read(XmlReader reader)
        {
            Property properties = Property.ReadFromAttributes(reader);
            string conditionName = properties["name"];
            return new Condition(conditionName, properties);
        }

        /// <summary>
        /// Načtení komplexní podmínky
        /// </summary>
        /// <param name="reader">Čtečka (XmlReader)</param>
        /// <returns></returns>
        public static ICondition ReadComplexCondition(XmlReader reader)
        {
            Property properties = Property.ReadFromAttributes(reader);
            reader.Read();
            ICondition condition = null;
            while (reader.Read())
            {
                switch (reader.NodeType)
                {
                    case XmlNodeType.Element:
                        switch (reader.LocalName)
                        {
                            case "And":
                                condition = AndCondition.Read(reader);
                                goto exit;
                            case "Or":
                                condition = OrCondition.Read(reader);
                                goto exit;
                            case "Not":
                                condition = NegatedCondition.Read(reader);
                                goto exit;
                            default:
                                throw new AddInLoadException(string.Format(string.Join(" ", GResources.GetResourceText(29450144) + "{0},") + '\n' + GResources.GetResourceText(29450145), reader.LocalName)); //RC 29450145 : první položka v ComplexCondition musí být <And>, <Or> nebo <Not>!
                        }
                }
            }
        exit:
            if (condition != null)
            {
                ConditionFailedAction action = properties.Get("action", ConditionFailedAction.Exclude);
                condition.Action = action;
            }
            return condition;
        }

        /// <summary>
        /// Načtení seznamu podmínek
        /// </summary>
        /// <param name="reader">XmlReader</param>
        /// <param name="endElement">konec načtení</param>
        /// <returns></returns>
        public static ICondition[] ReadConditionList(XmlReader reader, string endElement)
        {
            List<ICondition> conditions = new List<ICondition>();
            while (reader.Read())
            {
                switch (reader.NodeType)
                {
                    case XmlNodeType.EndElement:
                        if (reader.LocalName == endElement)
                            return conditions.ToArray();
                        break;
                    case XmlNodeType.Element:
                        switch (reader.LocalName)
                        {
                            case "And":
                                conditions.Add(AndCondition.Read(reader));
                                break;
                            case "Or":
                                conditions.Add(OrCondition.Read(reader));
                                break;
                            case "Not":
                                conditions.Add(NegatedCondition.Read(reader));
                                break;
                            case "Condition":
                                conditions.Add(Condition.Read(reader));
                                break;
                            default:
                                throw new AddInLoadException(string.Format(string.Join(" ", GResources.GetResourceText(29450144), "{0},") + '\n' + string.Join(" ", GResources.GetResourceText(29450146), "<{1}>", GResources.GetResourceText(29450147)), reader.LocalName, endElement)); //RC 29450147 : musí být <And>, <Or>, <Not> nebo <Condition>!
                        }
                        break;
                }
            }
            return conditions.ToArray();
        }

        /// <summary>
        /// Získání akce pro selhání uvedené akce položky
        /// </summary>
        /// <param name="conditionList">Seznam všech akcí</param>
        /// <param name="caller">Ovladač volající akci</param>
        /// <returns></returns>
        public static ConditionFailedAction GetFailedAction(IEnumerable<ICondition> conditionList, object caller)
        {
            ConditionFailedAction action = ConditionFailedAction.Nothing;
            foreach (ICondition condition in conditionList)
                if (!condition.IsValid(caller))
                {
                    if (condition.Action == ConditionFailedAction.Disable)
                        action = ConditionFailedAction.Disable;
                    else
                        return ConditionFailedAction.Exclude;
                }

            return action;
        }
    }
}
