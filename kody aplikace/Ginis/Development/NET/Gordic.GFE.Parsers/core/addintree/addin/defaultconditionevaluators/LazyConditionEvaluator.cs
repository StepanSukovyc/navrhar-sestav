//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.LazyConditionEvaluator.cs                </Name>
//    <Description> Nástroj pro hodnocení podmínek který načte jiné nástroje a spouští je</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Nástroj pro hodnocení podmínek který načte jiné nástroje a spouští je
    /// </summary>
    public class LazyConditionEvaluator : IConditionEvaluator
    {
        readonly string name;
        /// <summary>
        /// Název
        /// </summary>
        public string Name { get { return name; } }

        readonly string className;
        /// <summary>
        /// Název třídy
        /// </summary>
        public string ClassName { get { return className; } }

        AddIn addIn;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="addIn">Větev</param>
        /// <param name="properties">Vlastnosti</param>
        public LazyConditionEvaluator(AddIn addIn, Property properties)
        {
            this.addIn = addIn;
            this.name = properties["name"];
            this.className = properties["class"];
        }

        /// <summary>
        /// Kontroluje, zda podmínka je platná
        /// </summary>
        /// <param name="caller">Vlastnik podmínky</param>
        /// <param name="condition">podmínka</param>
        /// <returns></returns>
        public bool IsValid(object caller, Condition condition)
        {
            IConditionEvaluator evaluator = (IConditionEvaluator)addIn.CreateObject(className);
            if (evaluator == null)
                return false;

            AddInTree.ConditionEvaluators[name] = evaluator;
            return evaluator.IsValid(caller, condition);
        }

        /// <summary>
        /// řetězcová prezentace objektu
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return String.Format("[LazyLoadConditionEvaluator: className = {0}, name = {1}]",
                                 className,
                                 name);
        }

    }
}
