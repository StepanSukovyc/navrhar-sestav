//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.LazyLoadMaker.cs                        </Name>
//    <Description> Tento maker načítá jiné makery pokud potřebuje vytvořit položku.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Collections;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Tento maker načítá jiné makery pokud potřebuje vytvořit položku.
    /// </summary>
    public class LazyLoadMaker : IMaker
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

        /// <summary>
        /// Vázaná podmínka
        /// </summary>
        public bool HandleConditions
        {
            get
            {
                IMaker maker = (IMaker)addIn.CreateObject(className);
                if (maker == null)
                    return false;

                AddInTree.Makers[name] = maker;
                return maker.HandleConditions;
            }
        }

        AddIn addIn;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="addIn">Větev</param>
        /// <param name="properties">Vlastnosti</param>
        public LazyLoadMaker(AddIn addIn, Property properties)
        {
            this.addIn = addIn;
            this.name = properties["name"];
            this.className = properties["class"];
        }

        /// <summary>
        /// Konstruktor položky
        /// </summary>
        /// <param name="caller">Vlastník <see cref="AddInTree.BuildItem"/>.</param>
        /// <param name="entity">Jednotka s informaci</param>
        /// <param name="subItems">Seznam položek vytvořených jiným dozzer objektem pro dané podpoložky.</param>
        /// <returns>Vytvoření položky.</returns>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            IMaker maker = (IMaker)addIn.CreateObject(className);
            if (maker == null)
                return null;
            AddInTree.Makers[name] = maker;
            return maker.BuildItem(caller, entity, subItems);
        }

        /// <summary>
        /// řetězec prezentující objekt
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return String.Format("[LazyLoadMaker: " + GResources.GetResourceText(29450122) + " = {0}, " + GResources.GetResourceText(29450116) + " = {1}]", //RC 29450116 : název
                                 className,
                                 name);
        }
    }
}
