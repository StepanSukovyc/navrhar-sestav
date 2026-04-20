//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FontCommands.cs                        </Name>
//    <Description> příkazy písma nástrojové líšty                              </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-08                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Core.WinForm;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.WinClient.Service;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Text;
using System.Windows.Forms;

namespace Gordic.GFE.WinClient.FontCommands
{
    /// <summary>
    /// příkazy písma nástrojové líšty
    /// </summary>
    public abstract class FontAbstractComboBoxCommand : ContentAbstractComboBoxCommand
    {
        /// <summary>
        /// prostředník editace příslušné vlastnosti
        /// </summary>
        protected ITextFontHandler editable;
    }

    /// <summary>
    /// Změna barvy písma
    /// </summary>
    public class FontColor : FontAbstractComboBoxCommand
    {
        /// <summary>
        /// Dostupnost příkazu
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                editable = SimpleDesktop.Desktop.ActiveContent as ITextFontHandler;
                return editable != null && canEdit;
            }
        }

        /// <exclude/>
        protected override void LostFocus(LostFocusEventArgs focused)
        {
            if (IsEnabled)
                try
                {
                    FontService.Color = ColorService.GetGFEColor(comboBox.Text).Color;
                    if (focused.Focused && comboBox.Focused || !focused.Focused)
                        editable.ChangeColor(focused.Commit);
                }
                catch { }
        }

        /// <summary>
        /// kód aktualizace textové hodnoty objektu
        /// </summary>
        protected override void TextValueUpdate()
        {
            if (editable != null && !comboBox.Focused)
                comboBox.Text = editable.GetColorName();
        }
    }

    /// <summary>
    /// Změna barvy písma
    /// </summary>
    public class FontName : FontAbstractComboBoxCommand
    {
        /// <summary>
        /// Dostupnost příkazu
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                editable = SimpleDesktop.Desktop.ActiveContent as ITextFontHandler;
                return editable != null && canEdit;
            }
        }

        /// <exclude/>
        protected override void LostFocus(LostFocusEventArgs focused)
        {
            if (IsEnabled)
            {
                FontService.FontName = comboBox.Text;
                if (focused.Focused && comboBox.Focused || !focused.Focused)
                    editable.ChangeName(focused.Commit);
            }
        }

        /// <summary>
        /// kód aktualizace textové hodnoty objektu
        /// </summary>
        protected override void TextValueUpdate()
        {
            if (editable != null && !comboBox.Focused)
                comboBox.Text = editable.GetFontName();
        }

        /// <exclude/>
        protected override void OnOwnerChanged(EventArgs e)
        {
            InstalledFontCollection installedFontCollection = new InstalledFontCollection();
            List<FontComboBox.FontDescriptor> fonts = new List<FontComboBox.FontDescriptor>();

            foreach (var item in ListOfFonts.Fonts)
                fonts.Add(new FontComboBox.FontDescriptor(item));

            foreach (FontFamily fontFamily in installedFontCollection.Families)
                if (fontFamily.IsStyleAvailable(FontStyle.Regular)
                    && fontFamily.IsStyleAvailable(FontStyle.Bold)
                    && fontFamily.IsStyleAvailable(FontStyle.Italic))
                    fonts.Add(new FontComboBox.FontDescriptor(fontFamily));


            ToolBarComboBox box1 = (ToolBarComboBox)this.Owner;
            comboBox = box1.ComboBox;
            comboBox.DropDownStyle = ComboBoxStyle.DropDown;
            comboBox.Items.Clear();
            comboBox.Items.AddRange(fonts.ToArray());

            if (comboBox.Items.Count != 0)
                comboBox.SelectedIndex = 1;

            box1.TextValueUpdate += delegate { ThreadService.SafeThreadAsyncCall(TextValueUpdate); };

            box1.LostFocus += delegate { ThreadService.SafeThreadAsyncCall(LostFocus, new LostFocusEventArgs(false, true)); };
            box1.SelectedIndexChanged += delegate { ThreadService.SafeThreadAsyncCall(LostFocus, new LostFocusEventArgs(true, true)); };
            box1.TextChanged += delegate { ThreadService.SafeThreadAsyncCall(LostFocus, new LostFocusEventArgs(true, false)); };

            comboBox.AutoCompleteMode = AutoCompleteMode.SuggestAppend;
            comboBox.AutoCompleteSource = AutoCompleteSource.ListItems;
            LostFocus(new LostFocusEventArgs(false, false));
        }

        static StringFormat drawStringFormat = new StringFormat(StringFormatFlags.NoWrap);
        void ComboBoxDrawItem(object sender, System.Windows.Forms.DrawItemEventArgs e)
        {
            ComboBox comboBox = (ComboBox)sender;
            e.DrawBackground();

            Rectangle drawingRect = new Rectangle(e.Bounds.X,
                                                  e.Bounds.Y,
                                                  e.Bounds.Width,
                                                  e.Bounds.Height);

            Brush drawItemBrush = SystemBrushes.WindowText;
            if ((e.State & DrawItemState.Selected) == DrawItemState.Selected)
                drawItemBrush = SystemBrushes.HighlightText;

            if (comboBox.Enabled == false)
                e.Graphics.DrawString(GResources.GetResourceText(29450275) + "...", //RC 29450275 : Načtení
                                      comboBox.Font,
                                      drawItemBrush,
                                      drawingRect,
                                      drawStringFormat);
            else if (e.Index >= 0)
                if (sender is FontComboBox)
                    (sender as FontComboBox).ComboBoxDrawItem(e);

            e.DrawFocusRectangle();
        }
    }

    /// <summary>
    /// informace o šířce vybraného objektu
    /// </summary>
    class FontSize : FontAbstractComboBoxCommand
    {
        /// <summary>
        /// Indikuje dostupnost změny kroku šířky
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                editable = SimpleDesktop.Desktop.ActiveContent as ITextFontHandler;
                return editable != null && canEdit;
            }
        }

        /// <exclude/>
        protected override void LostFocus(LostFocusEventArgs focused)
        {
            if (IsEnabled)
                try
                {
                    FontService.Size = new SizeValue(comboBox.Text);
                    if (focused.Focused && comboBox.Focused || !focused.Focused)
                        editable.ChangeSize(focused.Commit);
                }
                catch { }
        }

        /// <summary>
        /// kód aktualizace textové hodnoty objektu
        /// </summary>
        protected override void TextValueUpdate()
        {
            if (editable != null && !comboBox.Focused)
                comboBox.Text = editable.GetSize();
        }
    }
}
