//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Editors.cs                     </Name>
//    <Description> Editory pro PropertyGrid                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Design;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.General;
using System.Runtime.InteropServices;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Položka, prezentující vybraný obrázek
    /// </summary>
    public class ImageItem
    {
        Image image;
        /// <summary>
        /// Obrázek položky
        /// </summary>
        public Image Image { get { return image; } set { image = value; } }
        string imageName;
        /// <summary>
        /// Název položky
        /// </summary>
        public string Name { get { return imageName; } set { imageName = value; } }

        private ImageItem() { }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="image">Obrázek</param>
        /// <param name="imageName">Název obrázku</param>
        public ImageItem(Image image, string imageName)
        {
            this.image = image;
            this.imageName = imageName;
        }

    }

    public class AbstractPropertyUITypeEditor
    {
        /// <summary>
        /// Editace hodnoty
        /// </summary>
        /// <param name="title">Titulek dialogového okna</param>
        /// <param name="path">Cesta ke konfiguraci dialogu</param>
        /// <param name="value">Stará hodnota</param>
        /// <returns>Nová hodnota</returns>
        public static object EditValue(string title, string path, object value)
        {
            PropertyOptions o = new PropertyOptions(title, AddInTree.GetTreeNode(path), ProcessService.Desktop.ActiveViewContent)
            {
                ByPropertyGrid = true
            };
            object ret = o.ShowDialog(ProcessService.Desktop.MainForm) == DialogResult.OK ? o.GetPropertyValue() : value;
            o.Dispose();
            return ret ?? value;
        }

        /// <summary>
        /// Editace hodnoty
        /// </summary>
        /// <param name="title">Titulek dialogového okna</param>
        /// <param name="path">Cesta ke konfiguraci dialogu</param>
        /// <param name="value">Stará hodnota</param>
        /// <param name="context">kontext</param>
        /// <returns>Nová hodnota</returns>
        public static object EditValue(string title, string path, object value, ITypeDescriptorContext context)
        {
            PropertyOptions o = new PropertyOptions(title, AddInTree.GetTreeNode(path), ProcessService.Desktop.ActiveViewContent, context)
            {
                ByPropertyGrid = true
            };
            object ret = o.ShowDialog(ProcessService.Desktop.MainForm) == DialogResult.OK ? o.GetPropertyValue() : value;
            o.Dispose();
            return ret ?? value;
        }

        /// <summary>
        /// Editace hodnoty
        /// </summary>
        /// <param name="title">Titulek dialogového okna</param>
        /// <param name="path">Cesta ke konfiguraci dialogu</param>
        /// <param name="context">kontext hodnoty</param>
        /// <param name="value">Stará hodnota</param>
        /// <returns>Nová hodnota</returns>
        public static object EditValue(string title, string path, ITypeDescriptorContext context, object value)
        {
            PropertyOptions o = new PropertyOptions(title, AddInTree.GetTreeNode(path), context)
            {
                ByPropertyGrid = true
            };
            object ret = o.ShowDialog(ProcessService.Desktop.MainForm) == DialogResult.OK ? o.GetPropertyValue() : value;
            o.Dispose();
            return ret ?? value;
        }

    }

    /// <summary>
    /// Editor atributů
    /// </summary>
    [ComVisible(false)]
    public class AttributeListEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value) =>
            AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450389), "/SinglePropertyDialog/Attributes", value); //RC 29450389 : Vlastnosti atributů

        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }

    }

    /// <summary>
    /// Editor obrázků
    /// </summary>
    [ComVisible(false)]
    public class ImageTypeEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            object item = AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450390), "/SinglePropertyDialog/Image", value); //RC 29450390 : Obrázek
            return item is ImageItem ? (item as ImageItem).Image : item;
        }

        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }
    /// <summary>
    /// Editor obrázků
    /// </summary>
    [ComVisible(false)]
    public class ImageFileNameTypeEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            object item = AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450390), "/SinglePropertyDialog/Image", value); //RC 29450390 : Obrázek
            return item is ImageItem ? (item as ImageItem).Name : item;
        }

        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }

    /// <summary>
    /// Editor obrázků
    /// </summary>
    [ComVisible(false)]
    public class OnlyImageFileNameTypeEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            object item = AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450390), "/SinglePropertyDialog/Image", value, context); //RC 29450390 : Obrázek
            return item is ImageItem ? (item as ImageItem).Name : item;
        }

        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }
    /// <summary>
    /// Editor písma
    /// </summary>
    [ComVisible(false)]
    public class TextFontEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            return AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450391), "/SinglePropertyDialog/Font", value); //RC 29450391 : Vlastnosti písma
        }
        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }

    /// <summary>
    /// Editor písma
    /// </summary>
    [ComVisible(false)]
    public class XMLTextEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            return AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450392), "/SinglePropertyDialog/XMLContent", value); //RC 29450392 : XML obsah
        }
        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }

    /// <summary>
    /// editor položky skriptu
    /// </summary>
    [ComVisible(false)]
    public class DictionaryItemEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            return AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450393), "/SinglePropertyDialog/DictionaryItem", context, value); //RC 29450393 : Položka seznamu
            //context.PropertyDescriptor.GetValue(context.Instance)
        }
        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }

    /// <summary>
    /// Editor skriptů
    /// </summary>
    [ComVisible(false)]
    public class ScriptListEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            return AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450394), "/SinglePropertyDialog/Script", value); //RC 29450394 : Skripty
        }
        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }

    /// <summary>
    /// Editor skriptů
    /// </summary>
    [ComVisible(false)]
    public class LineEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            return AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450395), "/SinglePropertyDialog/Line", value); //RC 29450395 : Řádek
        }
        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }

    /// <summary>
    /// Editor formátování
    /// </summary>
    [ComVisible(false)]
    public class TextFormattingEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            return AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450396), "/SinglePropertyDialog/Formatting", value); //RC 29450396 : Formátování
        }
        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }

    /// <summary>
    /// Editor textu
    /// </summary>
    [ComVisible(false)]
    public class TagTextEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        {
            return AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450370), "/SinglePropertyDialog/Text", value); //RC 29450370 : Text
        }
        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context)
        {
            return UITypeEditorEditStyle.Modal;
        }
    }

    /// <summary>
    /// Editor ohraničení
    /// </summary>
    [ComVisible(false)]
    public class ComplexSurroundEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        => AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450397), "/SinglePropertyDialog/Surround", value);
        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context) => UITypeEditorEditStyle.Modal;
    }

    /// <summary>
    /// Editor vnitřního orámování
    /// </summary>
    [ComVisible(false)]
    public class InnerSurroundEditor : UITypeEditor
    {
        /// <summary>
        /// Edits the specified object's value using the editor style indicated by the GetEditStyle method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <param name="provider">An IServiceProvider that this editor can use to obtain services.</param>
        /// <param name="value">The object to edit.</param>
        /// <returns>
        /// The new value of the object. If the value of the 
        /// object has not changed, this should return the same object it was passed.
        /// </returns>
        public override object EditValue(ITypeDescriptorContext context, IServiceProvider provider, object value)
        => AbstractPropertyUITypeEditor.EditValue(GResources.GetResourceText(29450795), "/SinglePropertyDialog/InnerSurround", value); //RC 29450795 : Vnitřní orámování
        /// <summary>
        /// Gets the editor style used by the EditValue method.
        /// </summary>
        /// <param name="context">An ITypeDescriptorContext that can be used to gain additional context information.</param>
        /// <returns>
        /// A UITypeEditorEditStyle value that indicates the style of editor used by the EditValue method.
        /// If the UITypeEditor does not support this method, then GetEditStyle will return None.
        /// </returns>
        public override System.Drawing.Design.UITypeEditorEditStyle GetEditStyle(ITypeDescriptorContext context) => UITypeEditorEditStyle.Modal;
    }

}
