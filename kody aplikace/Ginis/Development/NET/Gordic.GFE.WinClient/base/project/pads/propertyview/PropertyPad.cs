//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.PropertyPad.cs                         </Name>
//    <Description> podložka vlastnosti                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-30                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Drawing;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Project;
using Gordic.General;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// podložka vlastnosti
    /// </summary>
    class PropertyPad : AbstractPadContent
    {
        /// <summary>
        /// deskriptor vastnosti
        /// </summary>
        class ItemEventDescriptor : PropertyDescriptor
        {
            /// <summary>
            /// konstruktor třídy
            /// </summary>
            /// <param name="name">název</param>
            public ItemEventDescriptor(string name)
                : base(name, new Attribute[0])
            {
            }

            /// <summary>
            /// indikuje možnost obnovení hodnot komponenty
            /// </summary>
            /// <param name="component">dana komponenta</param>
            /// <returns>TRUE - hodnoty lze obnovit</returns>
            public override bool CanResetValue(object component) { return true; }
            /// <summary>
            /// typ komponenty deskriptora
            /// </summary>
            public override Type ComponentType { get { return typeof(Gordic.GFE.Parsers.Dom.IScriptHandler); } }
            /// <summary>
            /// získání hodnoty komponenty
            /// </summary>
            /// <param name="component">daná komponenta</param>
            /// <returns>hodnotu komponenty</returns>
            public override object GetValue(object component)
            {
                if (component == null) return null; //?!
                return new DictionaryItem(Name, S(component)[Name]);
            }

            /// <summary>
            /// indikuje, zda deskriptor je pouze na čtení či nikoliv
            /// </summary>
            public override bool IsReadOnly { get { return false; } }
            /// <summary>
            /// typ honoty elementu
            /// </summary>
            public override Type PropertyType { get { return typeof(DictionaryItem); } }
            
            /// <exclude/>
            public override void ResetValue(object component) { SetValue(component, string.Empty); }            

            /// <exclude/>
            public override void SetValue(object component, object value)
            {
                if (component == null && !(value is DictionaryItem)) return; //?!
                GFEScriptList list = S(component);

                if (list != null && list.ContainsKey(Name) && value is DictionaryItem)
                {
                    list[Name] = (value as DictionaryItem).Value;
                    list.OnScriptChanged();
                }
            }
            /// <exclude/>
            public override bool ShouldSerializeValue(object component)
            {
                if (component == null) return false; //?!
                return string.IsNullOrWhiteSpace(S(component).GetValueDefault(Name, string.Empty)) == false;
            }

            GFEScriptList S(object component)
            {
                return (component as Gordic.GFE.Parsers.Dom.IScriptHandler).Scripts;
            }
        }

        /// <summary>
        /// záložka události - skripty
        /// </summary>
        class TypeEventsTab : System.Windows.Forms.Design.PropertyTab
        {
            [BrowsableAttribute(true)]
            // This string contains a Base-64 encoded and serialized example 
            // property tab image.
            private readonly string img = "AAEAAAD/////AQAAAAAAAAAMAgAAAFRTeXN0ZW0uRHJhd2luZywgVmVyc2lvbj0xLjAuMzMwMC4wLCBDdWx0dXJlPW5ldXRyYWwsIFB1YmxpY0tleVRva2VuPWIwM2Y1ZjdmMTFkNTBhM2EFAQAAABVTeXN0ZW0uRHJhd2luZy5CaXRtYXABAAAABERhdGEHAgIAAAAJAwAAAA8DAAAAtgIAAAJCTbYCAAAAAAAANgAAACgAAAANAAAAEAAAAAEAGAAAAAAAAAAAAMQOAADEDgAAAAAAAAAAAADO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tn/ztbZztbZHh4eHh4eztbZztbZztbZztbZztbZztbZztbZztbZztbZ/87W2c7W2QDBAB4eHh4eHs7W2c7W2c7W2c7W2c7W2c7W2c7W2c7W2f/O1tnO1tnO1tkAwQAeHh4eHh7O1tnO1tnO1tnO1tnO1tnO1tnO1tn/ztbZztbZlJSU////AMEAHh4eHh4eztbZztbZztbZztbZztbZztbZ/87W2c7W2c7W2ZSUlP///wDBAB4eHh4eHs7W2c7W2c7W2c7W2c7W2f/O1tnO1tnO1tnO1tmUlJT///8AwQAeHh4eHh7O1tnO1tnO1tnO1tn/ztbZHh4eHh4eHh4eHh4eHh4e////AIAAHh4eHh4eztbZztbZztbZ/87W2ZSUlP///wDBAADBAADBAADBAADBAACAAB4eHh4eHs7W2c7W2f/O1tnO1tmUlJT///8AwQAAgAAeHh4eHh7O1tnO1tnO1tnO1tnO1tn/ztbZztbZztbZlJSU////AMEAAIAAHh4eHh4eztbZztbZztbZztbZ/87W2c7W2c7W2c7W2ZSUlP///wDBAACAAB4eHh4eHs7W2c7W2c7W2f/O1tnO1tnO1tnO1tnO1tmUlJT///8AwQAAgAAeHh4eHh7O1tnO1tn/ztbZztbZztbZztbZztbZztbZlJSU////AMEAAIAAHh4eHh4eztbZ/87W2c7W2c7W2c7W2c7W2c7W2c7W2ZSUlP///wDBAACAAB4eHs7W2f/O1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tnO1tn/Cw==";

            /// <summary>
            /// konstruktor záložky
            /// </summary>
            public TypeEventsTab() { }

            /// <summary>
            /// kolekce vlastnosti
            /// </summary>
            /// <param name="component">objekt </param>
            /// <param name="attributes">atributy</param>
            /// <returns></returns>
            public override PropertyDescriptorCollection GetProperties(object component, Attribute[] attributes)
            {
                return GetProperties(null, component, attributes);
            }

            // Returns the properties of the specified component extended with a 
            // CategoryAttribute reflecting the name of the type of the property.
            public override System.ComponentModel.PropertyDescriptorCollection GetProperties(ITypeDescriptorContext context, object component, Attribute[] attributes)
            {
                var r = new PropertyDescriptorCollection(null);
                if (component is Gordic.GFE.Parsers.Dom.IScriptHandler)
                    if (((Gordic.GFE.Parsers.Dom.IScriptHandler)component).Scripts != null)
                        foreach (var s in ((Gordic.GFE.Parsers.Dom.IScriptHandler)component).Scripts)
                            if (!string.IsNullOrEmpty(s.Key))
                                r.Add(new ItemEventDescriptor(s.Key));
                return r;
            }

            // Provides the name for the event property tab.
            public override string TabName { get { return GResources.GetResourceText(this.GetType().Assembly, 29450387); } } //RC 29450387 : Události

            // Provides an image for the event property tab.
            public override System.Drawing.Bitmap Bitmap { get { return new Bitmap(DeserializeFromBase64Text(img)); } }

            // This method can be used to retrieve an Image from a block of 
            // Base64-encoded text.
            Image DeserializeFromBase64Text(string text)
            {
                Image img = null;
                byte[] memBytes = Convert.FromBase64String(text);
                var formatter = new System.Runtime.Serialization.Formatters.Binary.BinaryFormatter();
                var stream = new System.IO.MemoryStream(memBytes);
                img = (Image)formatter.Deserialize(stream);
                stream.Close();
                return img;
            }
        }

        // IDE kontainer pro spojení objektu grid a Designer Host
        IDEContainer ideContainer = new IDEContainer();

        /// <summary>
        /// instance záložky
        /// </summary>
        static PropertyPad instance;

        /// <summary>
        /// prázdný kontejner, který se používá k obnovení tabulky vlastností
        /// </summary>
        readonly PropertyContainer emptyContainer = new PropertyContainer(false);

        /// <summary>
        /// aktivní kontainer
        /// </summary>
        internal static PropertyContainer ActiveContainer { get { return instance.activeContainer; } }

        /// <summary>
        /// Získání základní tabulky vlastnosti. Vrací null, pokud podložka vlastnost dosud nebyla vytvořena.
        /// </summary>
        public static PropertyGrid Grid { get { return instance?.grid; } }

        /// <summary>
        /// reakce na změnu vlastnosti
        /// </summary>
        public static event PropertyValueChangedEventHandler PropertyValueChanged;
        /// <summary>
        /// reakce na změnu vybranného objektu
        /// </summary>
        public static event EventHandler SelectedObjectChanged;
        /// <summary>
        /// reakce na změnu vlastnosti objektu
        /// </summary>
        public static event SelectedGridItemChangedEventHandler SelectedGridItemChanged;

        /// <summary>
        /// ovladač záložky
        /// </summary>
        public override Control Control { get { return panel; } }
        IHasPropertyContainer previousContent;
        PropertyContainer activeContainer;
        Panel panel;
        PropertyGrid grid;
        IDesignerHost host;
        object[] previousSO;

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        public PropertyPad()
        {
            instance = this;
            panel = new Panel();

            grid = new PropertyGrid
            {
                PropertySort = PropertyService.Get("FormsDesigner.DesignerOptions.PropertyGridSortAlphabetical", false) ? PropertySort.Alphabetical : PropertySort.CategorizedAlphabetical,
                Dock = DockStyle.Fill
            };

            grid.SelectedObjectsChanged += delegate(object sender, EventArgs e)
            {
                if (grid.SelectedObjects == null || grid.SelectedObjects.Length == 0)
                {
                    if (previousSO != null && previousSO.Length != 0)
                        grid.SelectedObjects = previousSO;
                }
                else
                    previousSO = grid.SelectedObjects;

                SelectedObjectChanged?.Invoke(sender, e);
            };
            grid.SelectedGridItemChanged += delegate(object sender, SelectedGridItemChangedEventArgs e)
            {
                SelectedGridItemChanged?.Invoke(sender, e);
            };

            panel.Controls.Add(grid);

            ProjectService.SolutionClosed += SolutionClosedEvent;

            grid.PropertyValueChanged += PropertyChanged;

            ContextMenuStrip strip = MenuService.CreateContextMenu(this, new EventArgsContextMenu("/ReportDesigner/Views/PropertyPad/ContextMenu"));
            if (strip != null)
                grid.ContextMenuStrip = strip;

            SimpleDesktop.Desktop.ActiveContentChanged += DesktopActiveContentChanged;
            // může se stat, že ActiveContent se změní před ActiveViewContent.
            // pokud nový obsah není IHasPropertyContainer a my jsme naslouchali jen ActiveContentChanged,
            // můžeme zobrazit PropertyPad z již neaktivního pohledu
            SimpleDesktop.Desktop.ActiveViewContentChanged += DesktopActiveContentChanged;
            DesktopActiveContentChanged(null, null);
        }

        /// <summary>
        /// Překreslení obsahu
        /// </summary>
        public override void RedrawContent() { grid.Refresh(); }
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (ideContainer != null)
                {
                    ideContainer.Disconnect();
                    ideContainer.Dispose();
                    ideContainer = null;
                }
                if (panel != null)
                {
                    panel.Dispose();
                    panel = null;
                }

                ProjectService.SolutionClosed -= SolutionClosedEvent;

                if (grid != null)
                {
                    grid.PropertyValueChanged -= PropertyChanged;
                    grid.Dispose();
                    grid = null;
                }

                instance = null;
            }
            base.Dispose(disposing);
        }

        /// <summary>
        /// Aktualizuje podložku vlastností, pokud uvedené položky jsou aktivní
        /// </summary>
        /// <param name="obj">Uvedený objekt</param>
        public static void RefreshItem(object obj)
        {
            ThreadService.AssertMainThread();
            if (instance != null && instance.grid.SelectedObjects.Contains(obj))
                instance.grid.SelectedObjects = instance.grid.SelectedObjects;
        }

        internal static void UpdateSelectedObjectIfActive(PropertyContainer container)
        {
            if (instance == null) return;
            if (instance.activeContainer != container) return;
            if (container.SelectedObjects != null)
                instance.SetDesignableObjects(container.SelectedObjects);
            else
                instance.SetDesignableObject(container.SelectedObject);
        }
        internal static void UpdateHostIfActive(PropertyContainer container)
        {
            if (instance == null) return;
            if (instance.activeContainer != container) return;
            if (instance.host == container.Host) return;
            if (instance.host != null)
                instance.RemoveHost(instance.host);
            if (container.Host != null)
                instance.SetDesignerHost(container.Host);
        }
        internal static void UpdatePropertyGridReplacementControl(PropertyContainer container)
        {
            if (instance == null) return;
            if (instance.activeContainer != container) return;
            if (container.PropertyGridReplacementControl != null)
            {
                if (!instance.panel.Controls.Contains(container.PropertyGridReplacementControl))
                {
                    instance.panel.Controls.Clear();
                    container.PropertyGridReplacementControl.Dock = DockStyle.Fill;
                    instance.panel.Controls.Add(container.PropertyGridReplacementControl);
                }
            }
            else
                if (!instance.panel.Controls.Contains(instance.grid))
                {
                    instance.panel.Controls.Clear();
                    instance.panel.Controls.Add(instance.grid);
                }
        }

        void RemoveHost(IDesignerHost host)
        {
            this.host = null;
            this.ideContainer.Disconnect();
        }
        void SetDesignerHost(IDesignerHost host)
        {
            this.host = host;
            if (host != null && grid != null)
            {
                this.ideContainer.ConnectGridAndHost(grid, host);
                grid.PropertyTabs.AddTabType(typeof(TypeEventsTab), PropertyTabScope.Document);
            }
            else
                this.ideContainer.Disconnect();
        }
        void PropertyChanged(object sender, PropertyValueChangedEventArgs e)
        {
            OnPropertyValueChanged(sender, e);
        }
        void OnPropertyValueChanged(object sender, PropertyValueChangedEventArgs e)
        {
            PropertyValueChanged?.Invoke(sender, e);
        }
        void SetDesignableObject(object obj)
        {
            grid.SelectedObject = obj;
            if (ideContainer.Item != null && ideContainer.Item.Value != null)
                try { grid.SelectedGridItem = ideContainer.Item; }
                catch { ideContainer.Item = grid.SelectedGridItem; }
        }
        void SetDesignableObjects(object[] obj)
        {
            try
            {
                grid.SelectedObjects = obj;
                if (ideContainer.Item != null)
                    if (ideContainer.Item.GetType().FullName.Equals("System.Windows.Forms.PropertyGridInternal.PropertyDescriptorGridEntry"))
                    {
                        if (ideContainer.Item.Value != null)
                            grid.SelectedGridItem = ideContainer.Item;
                    }
                    else
                        ideContainer.Item = grid.SelectedGridItem;
            }
            catch { ideContainer.Item = grid.SelectedGridItem; }
        }
        void SolutionClosedEvent(object sender, EventArgs e)
        {
            SetDesignableObjects(null);
        }
        void DesktopActiveContentChanged(object sender, EventArgs e)
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (!(SimpleDesktop.Desktop.ActiveContent is IHasPropertyContainer c))
                {
                    if (previousContent == null)
                        c = SimpleDesktop.Desktop.ActiveViewContent as IHasPropertyContainer;
                    else
                    {
                        // v případě, že předchozí obsah není viditelný, musíme odstranit aktivní kontejner
                        if (/*previousContent is IViewContent && */previousContent != SimpleDesktop.Desktop.ActiveViewContent)
                            c = null;
                        else
                            c = previousContent;
                    }
                }
                if (c != null)
                    SetActiveContainer(c.PropertyContainer);
                else
                    SetActiveContainer(null);
                previousContent = c;
            });
        }
        void SetActiveContainer(PropertyContainer pc)
        {
            if (activeContainer == pc) return;
            if (pc == null) 
                pc = emptyContainer;

            activeContainer = pc;
            previousSO = null;

            UpdateHostIfActive(pc);
            UpdateSelectedObjectIfActive(pc);
            UpdatePropertyGridReplacementControl(pc);
        }
    }
}
