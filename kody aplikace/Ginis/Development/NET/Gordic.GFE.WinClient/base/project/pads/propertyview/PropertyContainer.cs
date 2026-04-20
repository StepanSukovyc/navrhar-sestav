//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.PropertyContainer.cs                   </Name>
//    <Description> PropertyContainer pomocná třída ketrá spojuje ViewContent s PropertyGrid.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-30                                                  </Created>
//  </FileHeader>

using System.Collections;
using System.ComponentModel.Design;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.Gui;

namespace Gordic.GFE.WinClient
{
    /// <summary>
    /// IViewContent nebo IPadContent může implementovat toto rozhraní pro zobrazení
    /// sady vlastnosti objektu, který momentálně má fokus.
    /// </summary>
    interface IHasPropertyContainer
    {
        PropertyContainer PropertyContainer { get; }
    }

    /// <summary>
    /// PropertyContainer pomocná třída ketrá spojuje ViewContent s PropertyGrid.
    /// </summary>
    public sealed class PropertyContainer
    {
        /// <summary>
        /// Vytvoření nové instance PropertyContainer.
        /// </summary>
        public PropertyContainer() : this(true) { }

        internal PropertyContainer(bool createPadOnConstruction)
        {
            if (createPadOnConstruction && SimpleDesktop.Desktop != null)
            {
                PadDescriptor desc = SimpleDesktop.Desktop.GetPad(typeof(PropertyPad));
                desc?.CreatePad();
            }
        }

        /// <summary>
        /// Indije, že kontainer je aktuálně zobrazen v tabulce vlastnosti.
        /// </summary>
        public bool IsActivePropertyContainer { get => PropertyPad.ActiveContainer == this; }

        object selectedObject;
        object[] selectedObjects;
        /// <summary>
        /// Výbraný objekt
        /// </summary>
        public object SelectedObject
        {
            get => selectedObject;
            set
            {
                selectedObject = value;
                selectedObjects = null;
                PropertyPad.UpdateSelectedObjectIfActive(this);
            }
        }
        /// <summary>
        /// Vybrané objekty
        /// </summary>
        public object[] SelectedObjects
        {
            get => selectedObjects;
            set
            {
                selectedObject = null;
                selectedObjects = value;
                PropertyPad.UpdateSelectedObjectIfActive(this);
            }
        }

        /// <summary>
        /// Výbrané objekty
        /// </summary>
        public ICollection SelectableObjects { get; set; }

        IDesignerHost host;
        /// <summary>
        /// Host návrhu
        /// </summary>
        public IDesignerHost Host
        {
            get => host;
            set
            {
                host = value;
                PropertyPad.UpdateHostIfActive(this);
            }
        }

        Control propertyGridReplacementControl;
        /// <summary>
        /// Ovladač tabulky vlastností
        /// </summary>
        public Control PropertyGridReplacementControl
        {
            get => propertyGridReplacementControl;
            set
            {
                propertyGridReplacementControl = value;
                PropertyPad.UpdatePropertyGridReplacementControl(this);
            }
        }

        /// <summary>
        /// Vymaže všechny vlastnosti tohoto kontaineru.
        /// </summary>
        public void Clear()
        {
            Host = null;
            SelectableObjects = null;
            SelectedObject = null;
            PropertyGridReplacementControl = null;
        }
    }
}
