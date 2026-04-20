//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractFreezable.cs                     </Name>
//    <Description> Rozhraní zmražených instancí                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// Rozhraní zmražených instancí
    /// </summary>
    public interface IFreezable
    {
        /// <summary>
        /// Zjištění, zda tato instance je zmražená.
        /// </summary>
        bool IsFrozen { get; }

        /// <summary>
        /// Zmražení instance
        /// </summary>
        void Freeze();
    }

    /// <summary>
    /// Základní třída pro neměnné objekty.
    /// </summary>
    public abstract class Immutable : IFreezable
    {
        bool IFreezable.IsFrozen { get { return true; } }

        void IFreezable.Freeze() { }
    }

    /// <summary>
    /// Abstractní implementace rozhrani IFreezable
    /// </summary>
    public abstract class AbstractFreezable : IFreezable
    {
        bool isFrozen;

        /// <summary>
        /// Zjištění, zda tato instance je zmražená.
        /// </summary>
        public bool IsFrozen
        {
            get { return isFrozen; }
        }

        /// <summary>
        /// Zmražení instance.
        /// </summary>
        public void Freeze()
        {
            if (!isFrozen)
            {
                FreezeInternal();
                isFrozen = true;
            }
        }
        /// <summary>
        /// Interní zmražení
        /// </summary>
        protected virtual void FreezeInternal()
        {
        }
        /// <summary>
        /// Kontrola před změnou
        /// </summary>
        protected void CheckBeforeMutation()
        {
            if (isFrozen)
                throw new InvalidOperationException(string.Join(" ", GResources.GetResourceText(29450330), GetType().Name, '!')); //RC 29450330 : Zmrazené instance nelze měnit
        }

        /// <summary>
        /// Zmražení položek seznamu
        /// </summary>
        /// <typeparam name="T">Typ instance</typeparam>
        /// <param name="list">Seznam položek k zmrazení</param>
        /// <returns></returns>
        protected static IList<T> FreezeList<T>(IList<T> list) where T : IFreezable
        {
            if (list == null || list.Count == 0)
                return EmptyList<T>.Instance;
            list = new System.Collections.ObjectModel.ReadOnlyCollection<T>(list.ToArray());
            foreach (T item in list)
                item.Freeze();
            return list;
        }

        /// <summary>
        /// Mražení položek seznamu
        /// </summary>
        /// <param name="list">Seznam položek</param>
        /// <returns></returns>
        protected static IList<string> FreezeList(IList<string> list)
        {
            if (list == null || list.Count == 0)
                return EmptyList<string>.Instance;
            else
                return new System.Collections.ObjectModel.ReadOnlyCollection<string>(list.ToArray());
        }
    }

    static class EmptyList<T>
    {
        public static readonly System.Collections.ObjectModel.ReadOnlyCollection<T> Instance = new List<T>().AsReadOnly();
    }
}
