//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddInTreeNode.cs                         </Name>
//    <Description> Prezentuje existující cestu v <see cref="AddInTree"/>.      </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Prezentuje existující cestu v <see cref="AddInTree"/>.
    /// </summary>
    public sealed class AddInTreeNode
    {
        bool isSorted = false;

        /// <summary>
        /// Název větve
        /// </summary>
        public string Name { get; set; }

        Dictionary<string, AddInTreeNode> childNodes = new Dictionary<string, AddInTreeNode>();
        /// <summary>
        /// Slovník obsahující vnitřní cesty.
        /// </summary>
        public Dictionary<string, AddInTreeNode> ChildNodes { get { return childNodes; } }

        List<Entity> entities = new List<Entity>();
        /// <summary>
        /// Seznam závislých <see cref="Entity"/>ů.
        /// </summary>
        public List<Entity> Entities { get { return entities; } }

        /// <summary>
        /// Obrázek
        /// </summary>
        public Bitmap Icon { get; set; }

        /// <summary>
        /// Obrázek
        /// </summary>
        public string InsertAfter { get; set; }

        /// <summary>
        /// případný index větve
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// Podpora třídění jednotek s použitím InsertBefore/InsertAfter
        /// </summary>
        sealed class TopologicalSort
        {
            List<Entity> entities;
            readonly bool[] visited;
            List<Entity> sortedEntities;
            Dictionary<string, int> indexOfName;

            /// <summary>
            /// vytvoření nové instance třídy
            /// </summary>
            /// <param name="entities">seznam objektů k seřazení</param>
            public TopologicalSort(List<Entity> entities)
            {
                this.entities = entities;
                visited = new bool[entities.Count];
                sortedEntities = new List<Entity>(entities.Count);
                indexOfName = new Dictionary<string, int>(entities.Count);

                for (int i = 0; i < entities.Count; ++i)
                {
                    visited[i] = false;
                    indexOfName[entities[i].Id] = i;
                }
            }

            /// <summary>
            /// Spuštění třídění
            /// </summary>
            /// <returns></returns>
            public List<Entity> Execute()
            {
                InsertEdges();

                // spuštění všech jednotek
                for (int i = 0; i < entities.Count; ++i)
                    Visit(i);

                return sortedEntities;
            }

            void Visit(int entityIndex)
            {
                if (visited[entityIndex])
                    return;

                string[] after = entities[entityIndex].InsertAfter.Split(new char[] { ',' });
                foreach (string s in after)
                {
                    if (s == null || s.Length == 0)
                        continue;

                    if (indexOfName.ContainsKey(s))
                        Visit(indexOfName[s]);
                    else
                        LoggingService.Warning(string.Format(string.Join(" ", GResources.GetResourceText(29450150), "'{0}',", GResources.GetResourceText(29450188), "'{1}'", GResources.GetResourceText(29450187)), entities[entityIndex].InsertAfter, entities[entityIndex])); //RC 29450150 : jednotka
                }

                sortedEntities.Add(entities[entityIndex]);
                visited[entityIndex] = true;
            }
            void InsertEdges()
            {
                for (int i = 0; i < entities.Count; ++i)
                {
                    string before = entities[i].InsertBefore;
                    if (!string.IsNullOrEmpty(before))
                        if (indexOfName.ContainsKey(before))
                        {
                            string after = entities[indexOfName[before]].InsertAfter;
                            entities[indexOfName[before]].InsertAfter =
                                string.IsNullOrEmpty(after)
                                ? entities[i].Id
                                : after + ',' + entities[i].Id;
                        }
                        else
                            LoggingService.Warning(string.Format(string.Join(" ", GResources.GetResourceText(29450150), "'{0}',", GResources.GetResourceText(29450189), "'{1}'", GResources.GetResourceText(29450187)), before, entities[i])); //RC 29450150 : jednotka
                }
            }
        }

        /// <summary>
        /// Vytvoření vnitřní položky cesty.
        /// </summary>
        /// <param name="caller">Vlastník pro vytvoření položky.</param>
        public List<T> BuildChildItems<T>(object caller)
        {
            List<T> items = new List<T>(entities.Count);
            if (!isSorted)
            {
                entities = (new TopologicalSort(entities)).Execute();
                isSorted = true;
            }
            foreach (Entity entity in entities)
            {
                ArrayList subItems = null;
                if (childNodes.ContainsKey(entity.Id))
                    subItems = childNodes[entity.Id].BuildChildItems(caller);

                object result = entity.BuildItem(caller, subItems);
                if (result == null)
                    continue;
                if (result is IBuildItemsModifier mod)
                    mod.Apply(items);
                else if (result is T)
                    items.Add((T)result);
                else
                    throw new InvalidCastException(string.Format(string.Join(" ", GResources.GetResourceText(29450192), "<{0} id={1}>", GResources.GetResourceText(29450191), "{2}", GResources.GetResourceText(29450190), "{3}!"), entity.Name, entity.Id, result.GetType().FullName, typeof(T).FullName)); //RC 29450192 : Větev
            }

            return items;
        }
        /// <summary>
        /// konstruktor vnitřních větví
        /// </summary>
        /// <typeparam name="T1"></typeparam>
        /// <typeparam name="T2"></typeparam>
        /// <returns></returns>
        public Dictionary<T1, T2> BuildChildItems<T1, T2>()
        {
            Dictionary<T1, T2> items = new Dictionary<T1, T2>(entities.Count);
            if (!isSorted)
            {
                entities = (new TopologicalSort(entities)).Execute();
                isSorted = true;
            }
            foreach (Entity entity in entities)
            {/*
                ArrayList subItems = null;
                if (childNodes.ContainsKey(entity.Id))
                    subItems = childNodes[entity.Id].BuildChildItems(caller);

                object result = entity.BuildItem(caller, subItems);
                if (result == null)
                    continue;
                IBuildItemsModifier mod = result as IBuildItemsModifier;
                if (mod != null)
                    mod.Apply(items);
                else if (result is T)
                    items.Add((T)result);
                else
                    throw new InvalidCastException(string.Format("Větev AddInTreeNode <{0} id={1}> vrátila instanci {2} ale očekával se typ {3}.", entity.Name, entity.Id, result.GetType().FullName, typeof(T).FullName));*/
            }

            return items;
        }

        /// <summary>
        /// Vytvoření vnitřní položky dle cesty.
        /// </summary>
        /// <param name="caller">Vlastnik pro vytvoření položky.</param>
        public ArrayList BuildChildItems(object caller)
        {
            ArrayList items = new ArrayList(entities.Count);
            if (!isSorted)
            {
                entities = (new TopologicalSort(entities)).Execute();
                isSorted = true;
            }
            foreach (Entity entity in entities)
            {
                ArrayList subItems = null;
                if (childNodes.ContainsKey(entity.Id))
                    subItems = childNodes[entity.Id].BuildChildItems(caller);

                object result = entity.BuildItem(caller, subItems);
                if (result == null)
                    continue;
                if (result is IBuildItemsModifier mod)
                    mod.Apply(items);
                else
                    items.Add(result);
            }
            return items;
        }

        /// <summary>
        /// Vytvoření vnitřní položky dle cesty.
        /// </summary>
        /// <param name="childItemID">
        /// ID vnitřního objektu pro vytvoření.
        /// </param>
        /// <param name="caller">Vlastnik pro vytvoření položky.</param>
        /// <param name="subItems">Podpoložka předávaná makeru</param>
        public object BuildChildItem(string childItemID, object caller, ArrayList subItems)
        {
            foreach (Entity entity in entities)
                if (entity.Id.Equals(childItemID, StringComparison.OrdinalIgnoreCase))
                    return entity.BuildItem(caller, subItems);

            throw new TreePathNotFoundException(childItemID);
        }
    }
}
