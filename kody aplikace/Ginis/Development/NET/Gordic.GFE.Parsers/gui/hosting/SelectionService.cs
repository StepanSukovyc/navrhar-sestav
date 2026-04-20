//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SelectionService.cs                    </Name>
//    <Description> Služba pro práci s vybranými objekty                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-12-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Linq;
using System.Windows.Forms;
using Gordic.General;

namespace Gordic.GFE.Parsers.Hosting
{
    /// <summary>
    /// Služba pro práci s vybranými objekty
    /// </summary>
    public class SelectionService : ISelectionService
    {
        readonly IDesignerHost host;
        readonly ArrayList _selection;
        IComponent _primarySelection;
        /// <exclude/>
        public event EventHandler SelectionChanging;
        /// <exclude/>
        public event EventHandler SelectionChanged;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="host">Hostitel</param>
        public SelectionService(IDesignerHost host)
        {
            this.host = host;

            _selection = new ArrayList();

            // registrujeme událost Změna komponenty
            IComponentChangeService c = (IComponentChangeService)host.GetService(typeof(IComponentChangeService));
            c.ComponentRemoved += new ComponentEventHandler(OnComponentRemoved);
        }

        /// <summary>
        /// Získání výbraných objektů
        /// </summary>
        /// <returns></returns>
        public ICollection GetSelectedComponents() => _selection.ToArray();

        void OnSelectionChanging(EventArgs e) => SelectionChanging?.Invoke(this, e);// volání události SelectionChanging

        void OnSelectionChanged(EventArgs e) => SelectionChanged?.Invoke(this, e);// volání události SelectionChanging        

        /// <summary>
        /// Poslední přídaný objekt
        /// </summary>
        public object PrimarySelection { get => _primarySelection; }
        /// <summary>
        /// Nejvyšší komponenta
        /// </summary>
        IComponent _rootComponent
        {
            get
            {
                if (host != null && host.GetService(typeof(IDesignerHost)) is IDesignerHost designerHost)
                    return designerHost.RootComponent;
                throw new InvalidOperationException(GResources.GetResourceText(29450409)); //RC 29450409 : Nejvyšší komponenta neexistuje!
            }
        }
        /// <summary>
        /// Počet komponent
        /// </summary>
        public int SelectionCount { get => _selection.Count; }
        /// <summary>
        /// Zjištění, zda komponenta je mezí vybranými
        /// </summary>
        /// <param name="component">Zjišťovaná komponenta</param>
        /// <returns></returns>
        public bool GetComponentSelected(object component) => _selection.Contains(component);

        readonly object syncRoot = new object();

        /// <summary>
        /// Nastavení výbraných objektů
        /// </summary>
        /// <param name="components">Objekty</param>
        /// <param name="selectionType">Typ výběru</param>
        public void SetSelectedComponents(ICollection components, SelectionTypes selectionType)
        {
            lock (syncRoot)
            {
                OnSelectionChanging();

                bool control = false, shift = false;

                if (_selection == null)
                    throw new InvalidOperationException("_selection == null");

                // pokud kolekce je prázdná
                if (components == null || components.Count == 0)
                    components = new object[1] { host.RootComponent };

                // zjistíme, zda je stisknuto SHIFT nebo CONTROL tlačítko
                control = ((Control.ModifierKeys & Keys.Control) == Keys.Control);
                shift = ((Control.ModifierKeys & Keys.Shift) == Keys.Shift);

                if (selectionType == SelectionTypes.Replace)
                {
                    // jednoduchá záměná existující kolekce novou
                    _selection.Clear();
                    foreach (object component in components)
                        if (component != null && !_selection.Contains(component))
                            _selection.Add(component);
                }
                else if (selectionType == SelectionTypes.Remove)
                {
                    foreach (object component in components)
                        if (_selection.Contains(component))
                            _selection.Remove(component);
                }
                else
                {
                    if (selectionType != SelectionTypes.Add)
                        // vyčištění kolekce pokud CTRL nebo SHIFT není stisknuté
                        if (!control && !shift && components.Count == 1)
                            foreach (object component in components)
                                if (_selection.Contains(component))
                                    _selection.Clear();

                    // přidání/odstranění komponenty do/z seznamu výbraných
                    foreach (object component in components)
                        if (component != null && component is IComponent)
                        {
                            if (control || shift)
                            {
                                if (_selection.Contains(component))
                                    _selection.Remove(component);
                                else
                                    _selection.Insert(0, component);
                            }
                            else
                            {
                                if (!_selection.Contains(component))
                                    _selection.Add(component);
                                else
                                {
                                    _selection.Remove(component);
                                    _selection.Insert(0, component);
                                }
                            }
                        }
                }

                _primarySelection = _selection.Count != 0 ? (IComponent)_selection.ToArray().First() : _rootComponent;

                OnSelectionChanged();
            }
        }

        /// <summary>
        /// Volá se před změnou seznamu vybraných objektů
        /// </summary>
        protected virtual void OnSelectionChanging() => SelectionChanging?.Invoke(this, EventArgs.Empty);

        /// <summary>
        /// Změna seznamu výbraných objektů
        /// </summary>
        protected virtual void OnSelectionChanged() => SelectionChanged?.Invoke(this, EventArgs.Empty);

        /// <summary>
        /// Nastavení výbraných objektů
        /// </summary>
        /// <param name="components">Objekty</param>
        public void SetSelectedComponents(ICollection components) => SetSelectedComponents(components, SelectionTypes.Auto);

        public void OnComponentRemoved(object sender, ComponentEventArgs e)
        {
            if (_selection.Contains(e.Component))
            {
                // spuštění události selectionchanging 
                OnSelectionChanging(EventArgs.Empty);

                // odstranění komponenty ze seznamu
                _selection.Remove(e.Component);

                // výběr kořenové komponenty pokud jsme bez vybraných komponent
                if (SelectionCount == 0)
                    _selection.Add(host.RootComponent);

                // spuštění události selectionchanged
                OnSelectionChanged(EventArgs.Empty);
            }
        }

        /// <summary>
        /// Seznam vybraných objektů
        /// </summary>
        public List<object> SelectedComponents { get => (GetSelectedComponents() as object[]).ToList(); }

        /// <summary>
        /// Přidání specifického objektu
        /// </summary>
        /// <param name="tag">Přidávaný objekt</param>
        /// <param name="type">Typ přidání</param>
        public void SetSelectedComponents(object tag, SelectionTypes type)
        {
            if (tag as IComponent != null)
                SetSelectedComponents(new IComponent[1] { (IComponent)tag }, type);
        }

        /// <summary>
        /// Uvolnění seznamu vybraných objektů
        /// </summary>
        public void Clear()
        {
            // spuštění události selectionchanging 
            OnSelectionChanging(EventArgs.Empty);

            _selection.Clear();
            _primarySelection = null;
            // spuštění události selectionchanged
            OnSelectionChanged(EventArgs.Empty);
        }

        /// <summary>
        /// odstranění objektu ze seznamu vybraných
        /// </summary>
        /// <param name="obj">objekt k odstranění</param>
        public void Remove(object obj)
        {
            if (_selection.Contains(obj))
            {
                // spuštění události selectionchanging 
                OnSelectionChanging(EventArgs.Empty);

                _selection.Remove(obj);

                // spuštění události selectionchanged
                OnSelectionChanged(EventArgs.Empty);
            }
        }

        /// <summary>
        /// Odstranění stránek z výběru
        /// </summary>
        public void RemovePages()
        {
            int index = 0;
            while (index < _selection.Count)
                if (_selection[index] is IPage)
                    _selection.RemoveAt(index);
                else index++;
        }
    }
}
