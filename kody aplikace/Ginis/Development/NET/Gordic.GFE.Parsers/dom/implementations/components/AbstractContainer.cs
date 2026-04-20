//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractContainer.cs                  </Name>
//    <Description> Abstractní třída kontejneru objektů                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-12                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.TextEditor.Document;
using System.Runtime.InteropServices;
using Gordic.General;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Dom
{
    /// <summary>
    /// rozhraní kontaineru položek
    /// </summary>
    public interface IItemContainer
    {
        /// <summary>
        /// Přidání položky bočního panelu
        /// </summary>
        /// <param name="info">Přidávaná položka</param>
        /// <param name="e">data o myší</param>
        /// <param name="type">Typ vkládané komponenty</param>
        /// <param name="format">Formát sestavy</param>
        IComponent CreateItem(dynamic info, MouseEventArgs e, ComponentType type, GFEFormat format = null);
        /// <summary>
        /// Aktualizace položky dle struktury
        /// </summary>
        void RefreshByStructure();

        /// <summary>
        /// Metoda Pře indexace vnořených objektů 
        /// </summary>
        void Reindex();
    }
    /// <summary>
    /// Abstractní třída kontejneru objektů
    /// </summary>
    [ComVisible(false)]
    public abstract class URAbstractContainer : UndoRedoList<ITagComponent>, IItemContainer, IContainerComponent, IComponent,
        IDisposable, ITowedHandler, IDesignSearchHandler, IKeyActionHandler
    {
        #region IDesignerSearchComponent
        /// <summary>
        /// Získání objektu, co se nachází ve výběru
        /// </summary>
        /// <param name="selection">Informace o výběru, dle které určíme, na řádky výběru</param>
        /// <returns>Seznam objektů, které se nachází ve výbrané části.</returns>
        public virtual List<IComponent> SearchComponentText(ISelection selection)
        {
            List<IComponent> result = new List<IComponent>();
            // najdeme položku, která obsahuje uvedenou pozici a je viditelná
            result.AddRange(this.FindAll(tg => tg != null && selection.StartPosition.Line <= tg.StartPosition && tg.StartPosition <= selection.EndPosition.Line && !((tg is IPageBackground) && (tg as IPageBackground).BackType)));

            // najdeme všechny regiony a uvnitř regionu objekty dle výběru
            foreach (var item in this.FindAll(rg => rg is IDesignSearchHandler))
                result.AddRange((item as IDesignSearchHandler).SearchComponentText(selection));

            // objekt nenalezen
            if (this is IPositionHandler
                && selection.StartPosition.Line <= (this as IPositionHandler).StartPosition
                && (this as IPositionHandler).StartPosition <= selection.EndPosition.Line)
                result.Add(this);

            return result.Distinct().ToList();
        }
        /// <summary>
        /// hledání všech objektů dle pozice <paramref name="location"/>
        /// pod kurzorem
        /// </summary>
        /// <param name="location">Umístění kurzóru</param>
        /// <returns>Buď objekt samotný nebo seznam vnořených objektů</returns>
        public virtual List<IComponent> SearchComponent(Point location)
        {
            // z APagePanel objektu
            List<IComponent> result = new List<IComponent>();
            object towedObject = GetTowedObject((PointF)location);
            if (towedObject is IComponent)
                result.Add(towedObject as IComponent);
            else if (towedObject is IList<object>)
                result.AddRange(CommonService.GetComponents(towedObject as IList<object>));
            result.Sort(new DeepOrderComparer(true));
            return result.Distinct().ToList();
            //^^^
        }
        #endregion

        #region IComponent
        /// <summary>
        /// Metoda po uvolnění objektu
        /// </summary>
        public event EventHandler Disposed;
        /// <summary>
        /// ISite komponenty
        /// </summary>
        [Browsable(false)]
        public ISite Site { get; set; }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                while (Count != 0)
                {
                    this[0].Dispose();
                    this[0] = null;
                    RemoveAt(0);
                }

                Disposed?.Invoke(this, EventArgs.Empty);
            }
        }
        ~URAbstractContainer() { Dispose(false); }
        #endregion

        #region ITowedHandler
        /// <summary>
        /// získání objektu pod kurzorem
        /// </summary>
        /// <param name="point">pozice kurzoru vůči stránce</param>
        /// <returns>Objekt, který se nachází bezprostředně pod kurzorem</returns>
        public virtual object GetTowedObject(PointF point)
        {
            List<object> res = new List<object>();
            if (this is ITagComponent)
                if (!(this is IPageBackground) ||
                    (this is IPageBackground && !(this as IPageBackground).BackType))
                    if ((this as ITagComponent).BoundsInPixels.Contains(point))
                        res.Add(this);

            foreach (var item in this)
            {
                if (item is IPageBackground && (item as IPageBackground).BackType)
                    continue;

                if (item != null && item.BoundsInPixels.Contains(point))
                {
                    object obj = item is ITowedHandler ? (item as ITowedHandler).GetTowedObject(point) : item;
                    if (obj != null && !ResContains(res, obj))
                        res.Add(obj);

                    if (item is ITagComponent && item is ITowedHandler && !ResContains(res, item))
                        res.Add(item);
                }
            }

            if (res.Count != 0)
            {
                // řazení - jako pprvní není kontajner
                res.Sort(delegate (object p1, object p2) { if (p1 is URAbstractContainer) return 1; return -1; });
                return res;
            }

            return this is IZoomSizable ? ((this as IZoomSizable).BoundsInPixels.Contains(point) ? this : null) : null;
        }

        bool ResContains(List<object> res, object item)
        {
            bool result = res.Contains(item);
            if (!result)
                foreach (var resitem in res)
                {
                    if (resitem is List<object>)
                        result = ResContains((List<object>)resitem, item);
                    if (result)
                        return true;
                }
            return result;

        }

        /// <summary>   
        /// pozice objektu <paramref name="item"/> v seznamu
        /// </summary>
        /// <param name="item">objekt, pozice kterého se hledá</param>
        /// <returns>číslo, prezentující pozici objektu <paramref name="item"/> v seznamu daného objektu.</returns>
        public int IndexOf(object item)
        {
            return item is ITagComponent ? base.IndexOf(item as ITagComponent) : -1;
        }
        #endregion

        #region IItemContainer
        /// <summary>
        /// Přidání položky bočního panelu
        /// </summary>
        /// <param name="info">Přidávaná položka</param>
        /// <param name="e">data o myší</param>
        /// <param name="type">Typ vkládané komponenty</param>
        /// <param name="format">Formát sestavy</param>
        public virtual IComponent CreateItem(dynamic info, MouseEventArgs e, ComponentType type, GFEFormat format = null) { return null; }
        /// <summary>
        /// Aktualizace kontaineru
        /// </summary>
        public virtual void RefreshByStructure()
        {
            foreach (ITagComponent item in this)
                if (item is IItemContainer)
                    (item as IItemContainer).RefreshByStructure();
                else item.RefreshByStructure();
        }

        /// <summary>
        /// Metoda Pře indexace vnořených objektů 
        /// </summary>
        public virtual void Reindex() { }
        #endregion

        #region IKeyActionHandler
        /// <exclude/>
        public virtual IComponent GetLeftObject() { return null; }
        /// <exclude/>
        public virtual IComponent GetLeftObject(object obj) { return null; }
        /// <exclude/>
        public virtual IComponent GetRightObject() { return null; }
        /// <exclude/>
        public virtual IComponent GetRightObject(object obj) { return null; }
        /// <exclude/>
        public virtual IComponent GetTopObject() { return null; }
        /// <exclude/>
        public virtual IComponent GetTopObject(object obj, ISizable sizeable) { return null; }
        /// <exclude/>
        public virtual IComponent GetBottomObject() { return null; }
        /// <exclude/>
        public virtual IComponent GetBottomObject(object obj, ISizable sizeable) { return null; }
        #endregion

        /// <summary>
        /// Vytvoření nového objektu 'region' na zadaném umístění
        /// </summary>
        /// <param name="insertPoint">Levý-horní roh nového regionu - zkorigovaný dle ZOOM hodnoty</param>
        /// <param name="page">Stránka, do které se objekt vkládá</param>
        /// <param name="node">Položka bočního panelu s informaci o vkládaném objektu</param>
        /// <param name="type">Typ přidávané položky</param>
        /// <param name="format">Formát sestavy</param>
        public virtual IComponent CreateObject(PointF insertPoint, IPage page, dynamic node, ComponentType type, GFEFormat format = null) { return null; }

        /// <summary>
        /// Indikuje mo6nost daný objekt optimalizovat při převodu do ALF formátu
        /// </summary>
        public virtual bool CanBeOptimized => true;

        /// <summary>
        /// Přidání položek ze seznamu do sestavy
        /// </summary>
        /// <param name="obj">Přidávaná položka</param>
        /// <param name="e">Pozice, na kterou se vkládá</param>
        /// <param name="isDiff">Indikuje, že e obsahuje diference</param>
        public virtual void InsertTagComponent(object obj, PointF e, bool isDiff) { }

        /// <summary>
        /// odstranění obsahu kontaineru
        /// </summary>
        public virtual void DeleteContent() { }
        /// <summary>
        /// odstranění obsahu kontaineru
        /// </summary>
        /// <param name="cmp">objekt k odstranění</param>
        public virtual void Delete(ITagComponent cmp) { if (Contains(cmp)) Remove(cmp); }

        /// <summary>
        /// Nalezení prvního objektu s vlastnosti Edit = true
        /// </summary>
        /// <param name="editControl">Aktivní ovladač</param>
        /// <param name="callBackCondition">Podmínka vyhodnocení výsledku hledání</param>
        /// <returns>TRUE - objekt naleyen a aktivovan</returns>
        public object FindNextControl(IEditControl editControl, Func<object, bool> callBackCondition)
        {
            return editControl != null
                ? GetNext(editControl.Owner as ITagComponent, callBackCondition)
                // najit první 
                : GetNext(-1, this, callBackCondition);
        }
        /// <summary>
        /// Nalezení prvního předchozího objektu s vlastnosti Edit = true
        /// </summary>
        /// <param name="editControl">Aktivní ovladač</param>
        /// <param name="callBackCondition">Podmínka vyhodnocení výsledku hledání</param>
        /// <returns>TRUE - objekt naleyen a aktivovan</returns>
        public object FindPreviousControl(IEditControl editControl, Func<object, bool> callBackCondition)
        {
            return editControl != null
                ? GetPrevious(editControl.Owner as ITagComponent, callBackCondition)
                // najit poslední objekt
                : GetPrevious(this.Count, this, callBackCondition);
        }

        /// <summary>
        /// Nalezení předchozího objektu v této kolekci
        /// </summary>
        /// <param name="tagComponent"></param>
        /// <param name="callBackCondition">Podmínka vyhodnocení výsledku hledání</param>
        /// <returns>Objekt seznamu vyhovující podmínce, nebo v opačném případě samotný objekt</returns>
        object GetPrevious(ITagComponent tagComponent, Func<object, bool> callBackCondition)
        {
            if (tagComponent == null)
                return tagComponent;

            if (tagComponent.Page != this)
                // připad hledání na předchozí stránce
                return GetPrevious(Count, this, callBackCondition);

            // případ hledání na stránce vlastníka objektu
            object c = tagComponent;
            var p = tagComponent.Parent as IContainerComponent;
            while (p != null)
            {
                var r = GetPrevious(p.IndexOf(c), p, callBackCondition);
                if (r != null) return r;
                c = p;
                p = p is ITagComponent ? (p as ITagComponent).Parent as IContainerComponent : p.Parent;
            }
            return null;
        }
        object GetPrevious(int index, IContainerComponent container, Func<object, bool> callBackCondition)
        {
            //if (index != 0)
            for (int i = index - 1; i >= 0; i--)
            {
                if (container[i] is IDefaultDataItemHandler v)
                {
                    if (v is IVisibleComponent vc && vc.Visible == false) continue;

                    var di = v.DataItem;
                    if (di == null || di.Edit == false) continue;

                    if (callBackCondition(container[i]))
                        return container[i];
                }
                if (container[i] is IContainerComponent c)
                {
                    var r = GetPrevious(c.Count, c, callBackCondition);
                    if (r != null) return r;
                }
            }

            // případ regionu?
            //return container is ITagComponent ? GetPrevious(container as ITagComponent, callBackCondition) : null;
            return null;
        }

        object GetNext(ITagComponent tagComponent, Func<object, bool> callBackCondition)
        {
            if (tagComponent == null)
                return tagComponent;

            if (tagComponent.Page != this)
                // připad hledání na předchozí stránce
                return GetNext(-1, this, callBackCondition);

            // případ hledání na stránce vlastníka objektu
            object c = tagComponent;
            var p = tagComponent.Parent as IContainerComponent;
            while (p != null)
            {
                int position = c is ITagComponent ? (c as ITagComponent).PropertyOrder : -1;
                if (position == -1)
                    position = p.IndexOf(c);

                var r = GetNext(position, p, callBackCondition);
                if (r != null) return r;
                c = p;
                p = p is ITagComponent ? (p as ITagComponent).Parent as IContainerComponent : p.Parent;
            }
            return null;
        }
        object GetNext(int index, IContainerComponent container, Func<object, bool> callBackCondition)
        {
            object p_index = GetNextByOrder(index, container, callBackCondition);

            if (p_index != null)
                return p_index;

            //if (index != container.Count - 1)
            for (int i = index + 1; i < container.Count; i++)
            {
                if (container[i] is IDefaultDataItemHandler v)
                {
                    if (v is IVisibleComponent vc && vc.Visible == false) continue;

                    var di = v.DataItem;
                    if (di == null || di.Edit == false) continue;

                    if (callBackCondition(container[i]))
                        return container[i];
                }
                if (container[i] is IContainerComponent c)
                {
                    var r = GetNext(-1, c, callBackCondition);
                    if (r != null) return r;
                }
            }

            // případ regionu?
            //return container is ITagComponent ? GetNext(container as ITagComponent, callBackCondition) : null;
            return null;
        }

        private object GetNextByOrder(int index, IContainerComponent container, Func<object, bool> callBackCondition)
        {
            int index_to_find = index + 1;
            int i = 0;
            while (i < container.Count)
            {
                var item = container[i];
                if (item is ITagComponent)
                    if ((item as ITagComponent).PropertyOrder == index_to_find)
                    {
                        if (item is IDefaultDataItemHandler v)
                        {
                            if (v is IVisibleComponent vc && vc.Visible == false) { index_to_find++; i = 0; continue; }

                            var di = v.DataItem;
                            if (di == null || di.Edit == false) { index_to_find++; i = 0; continue; }

                            if (callBackCondition(item))
                                return item;
                        }
                        else
                        {
                            if (item is IContainerComponent c)
                            {
                                var r = GetNext(-1, c, callBackCondition);
                                if (r != null) return r;
                            }
                            else
                            {
                                index_to_find++; i = 0;
                                continue;
                            }
                        }
                    }
                i++;
            }

            return null;
        }

        /// <summary>
        /// Posunutí vnitřních objektů o diferenciál
        /// </summary>
        /// <param name="diffX">změna X</param>
        /// <param name="diffY">změna Y</param>
        public void ShiftItems(float diffX, float diffY)
        {
            foreach (var item in this)
            {
                if (item is ISizable)
                {
                    (item as ISizable).Left += diffX;
                    (item as ISizable).Top += diffY;
                }

                if (item is URAbstractContainer)
                    (item as URAbstractContainer).ShiftItems(diffX, diffY);
            }
        }

        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public URAbstractContainer()
            : base(Services.UndoRedoService.Manager)
        {

        }
        /// <summary>
        /// prázdný konstruktor třídy
        /// </summary>
        public URAbstractContainer(IUndoRedoManager manager)
            : base(manager)
        {

        }

        #region IContainerComponent Members
        object IContainerComponent.this[int index]
        {
            get { return this[index]; }
        }
        IContainerComponent IContainerComponent.Parent { get => null; }
        #endregion

        /// <summary>Seznam všech prvků, včetně vnořených</summary>
        [Browsable(false)]
        public IEnumerable<ITagComponent> All
        {
            get { return AllBut(); }
        }
        /// <summary>Seznam všech prvků, včetně vnořených</summary>
        public IEnumerable<ITagComponent> AllBut(params ITagComponent[] excepts)
        {
            var s = new Stack<IEnumerator<ITagComponent>>();
            IEnumerator<ITagComponent> pp = this.GetEnumerator();
            while (true)
            {
                while (pp.MoveNext())
                {
                    ITagComponent c = pp.Current;
                    if (excepts.Contains(c)) continue;
                    yield return c;
                    if (c is URAbstractContainer cc)
                    {
                        s.Push(pp);
                        pp = cc.GetEnumerator();
                        continue;
                    }
                    if (c is DefaultContentGrid g)
                    {
                        var gc = (IContainerComponent)c;
                        g.ReloadIfNeeded(); //v pripade potreby uz vraci nove radky
                        //do stacku musim dat v opacnem poradi - aby se vybirali v poradi definice
                        s.Push(pp);
                        pp = null;
                        for (int ri = gc.Count - 1; ri >= 0; ri--)
                        {
                            var line = (GridLine)gc[ri];
                            if (line.Visible == false) continue;
                            for (int ci = line.Count - 1; ci >= 0; ci--)
                            {
                                var cell = line[ci];
                                s.Push(cell.GetEnumerator());
                            }
                        }
                        break;
                    }
                }
                if (s.Count == 0) break;
                pp = s.Pop();
            }
        }
        /// <summary>Seznam všech prvků, včetně vnořených</summary>
        [Browsable(false)]
        public IEnumerable<DefaultContentGrid> AllGrids
        {
            get { return AllGridsBut(); }
        }        /// <summary>Seznam všech prvků, včetně vnořených</summary>
        public IEnumerable<DefaultContentGrid> AllGridsBut(params ITagComponent[] excepts)
        {
            var s = new Stack<IEnumerator<ITagComponent>>();
            IEnumerator<ITagComponent> pp = this.GetEnumerator();
            while (true)
            {
                while (pp.MoveNext())
                {
                    ITagComponent c = pp.Current;
                    if (excepts.Contains(c)) continue;
                    if (c is URAbstractContainer cc)
                    {
                        s.Push(pp);
                        pp = cc.GetEnumerator();
                        continue;
                    }
                    if (c is DefaultContentGrid g)
                    {
                        yield return g;
                    }
                }
                if (s.Count == 0) break;
                pp = s.Pop();
            }
        }
    }
}
