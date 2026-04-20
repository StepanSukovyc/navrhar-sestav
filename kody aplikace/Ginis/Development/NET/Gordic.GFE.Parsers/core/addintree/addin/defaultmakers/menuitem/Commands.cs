//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Commands.cs                              </Name>
//    <Description> Změna velikosti lupy                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-07-30                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core.Services;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Gui;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Změna velikosti lupy
    /// </summary>
    public class Zoom : AbstractComboBoxCommand
    {
        ComboBox comboBox;
        IZoomHandler editable;
        /// <summary>
        /// Dostupnost příkazu
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                editable = ParserService.GetActiveViewContent() as IZoomHandler;
                return editable != null;
            }
        }

        /// <summary>
        /// Reakce na změnu vlastníka
        /// </summary>
        /// <param name="e">předávaný argument</param>
        protected override void OnOwnerChanged(EventArgs e)
        {
            base.OnOwnerChanged(e);
            ToolBarComboBox box1 = (ToolBarComboBox)this.Owner;
            comboBox = box1.ComboBox;
            comboBox.DropDownStyle = ComboBoxStyle.DropDown;
            if (box1.Items != null)
                comboBox.Items.AddRange(box1.Items.ToArray());
            box1.TextValueUpdate += delegate
            {
                if (!comboBox.Focused)
                    if (editable == null && !string.IsNullOrEmpty(comboBox.Text))
                        comboBox.Text = string.Empty;
                    else if (editable != null && !comboBox.Text.Equals(editable.ZoomValue, StringComparison.Ordinal))
                        comboBox.Text = editable.ZoomValue;
            };
            comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
            comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (editable != null)
                editable.ZoomValue = comboBox.SelectedItem != null ? comboBox.SelectedItem.ToString() : comboBox.Text;
        }
    }

    /// <summary>
    /// Zobrazit/skrýt mřížku 
    /// </summary>
    public class ShowColorOf : AbstractCheckableMenuCommand
    {
        IDesignerPropertyHandler content;
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                if (ParserService.GetActiveViewContent != null)
                {
                    content = ParserService.GetActiveViewContent() as IDesignerPropertyHandler;
                    return content != null;
                }
                return base.IsEnabled;
            }
        }

        /// <summary>
        /// Indikuje vybranost
        /// </summary>
        public override bool IsChecked
        {
            get { return content != null ? IsEnabled && content.ShowColorOf : ServiceManager.GraphicSettingService.GetShowColorOf(null); }
            set
            {
                if (content != null)
                {
                    if (IsEnabled)
                        content.ShowColorOf = value;
                }
                else
                    ServiceManager.GraphicSettingService.SetShowColorOf(null, value);
            }
        }

        /// <summary>
        /// Spuštění akce Do popředí
        /// </summary>
        public override void Run() { IsChecked = !IsChecked; }
    }

    /// <summary>
    /// Zobrazit/skrýt mřížku
    /// </summary>
    public class ShowGrid : AbstractCheckableMenuCommand
    {
        IDesignerPropertyHandler content;
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                if (ParserService.GetActiveViewContent != null)
                {
                    content = ParserService.GetActiveViewContent() as IDesignerPropertyHandler;
                    return content != null && content.EnableShowGrid;
                }
                return base.IsEnabled;
            }
        }

        /// <summary>
        /// Indikuje vybranost
        /// </summary>
        public override bool IsChecked
        {
            get { return content != null ? IsEnabled && content.ShowGrid : ServiceManager.GraphicSettingService.GetShowGrid(null); }
            set
            {
                if (content != null && content.EnableShowGrid)
                {
                    if (IsEnabled)
                        content.ShowGrid = value;
                }
                else
                    ServiceManager.GraphicSettingService.SetShowGrid(null, value);
            }
        }

        /// <summary>
        /// Spuštění akce Do popředí
        /// </summary>
        public override void Run() { IsChecked = !IsChecked; }
    }

    /// <summary>
    /// Zobrazit/skrýt řazení
    /// </summary>
    public class ShowOrder : AbstractCheckableMenuCommand
    {
        IDesignerPropertyHandler content;
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                if (ParserService.GetActiveViewContent != null)
                {
                    content = ParserService.GetActiveViewContent() as IDesignerPropertyHandler;
                    return content != null && content.EnableShowOrder;
                }
                return base.IsEnabled;
            }
        }

        /// <summary>
        /// Indikuje vybranost
        /// </summary>
        public override bool IsChecked
        {
            get { return content != null ? IsEnabled && content.ShowOrder : ServiceManager.GraphicSettingService.GetShowOrder(null); }
            set
            {
                if (content != null && content.EnableShowOrder)
                {
                    if (IsEnabled)
                        content.ShowOrder = value;
                }
                else
                    ServiceManager.GraphicSettingService.SetShowOrder(null, value);
            }
        }

        /// <summary>
        /// Spuštění akce Do popředí
        /// </summary>
        public override void Run() { IsChecked = !IsChecked; }
    }

}
