//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SpecificFormatCommands.cs              </Name>
//    <Description> Zobrazit/skrýt mřížku                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.WinClient.FormatOffice;
using System.Windows.Forms;
using System.Drawing;
using Gordic.GFE.Parsers.Dom;
using Gordic.General;

namespace Gordic.GFE.WinClient.SpecificFormatCommands
{
    /// <summary>
    /// Pře indexace objektů v regionu
    /// </summary>
    class ReindexObjects : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get => ServiceService.ServiceSelection?.SelectedComponents.Count > 0 && ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => cmp is IItemContainer && (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            using (AsynchronousWaitDialog monitor = AsynchronousWaitDialog.ShowWaitDialog(GResources.GetResourceText(29450697))) //RC 29450697 : probíhá pře indexace...
            {
                monitor.Start();

                foreach (var item in ServiceService.ServiceSelection.SelectedComponents.FindAll(cmp => cmp is IItemContainer))
                    if (item is IItemContainer)
                        (item as IItemContainer).Reindex();
            }
        }
    }

    /// <summary>
    /// Zobrazit/skrýt mřížku
    /// </summary>
    public class ShowObjects : AbstractCheckableMenuCommand
    {
        IDesignerPropertyHandler _editable;
        /// <exclude/>
        public override bool IsChecked
        {
            get
            {
                if (_editable == null)
                    _editable = (SimpleDesktop.Desktop.ActiveViewContent as IDesignerPropertyHandler);

                base.IsChecked = _editable != null && _editable.ShowColorOfObjects;
                return base.IsChecked;
            }
            set
            {
                base.IsChecked = value;
                if (_editable != null) _editable.ShowColorOfObjects = value;
            }
        }

        /// <summary>
        /// Změna statusu zobrazení mřížky
        /// </summary>
        public static void ChangeStatus()
        {
            IDesignerPropertyHandler editable = (SimpleDesktop.Desktop.ActiveViewContent as IDesignerPropertyHandler);
            if (editable != null)
                editable.ShowColorOfObjects = !editable.ShowColorOfObjects;
        }
    }

    /// <summary>
    /// Zobrazit/skrýt mřížku
    /// </summary>
    public class ShowToolTip : AbstractCheckableMenuCommand
    {
        /// <exclude/>
        public override bool IsChecked
        {
            get
            {
                base.IsChecked = ReportDesignerProperties.Instance.ShowToolTip;
                return base.IsChecked;
            }
            set
            {
                base.IsChecked = value;
                ReportDesignerProperties.Instance.ShowToolTip = value;
            }
        }

        /// <summary>
        /// Změna statusu zobrazení mřížky
        /// </summary>
        public static void ChangeStatus()
        {
            IDesignerPropertyHandler editable = (SimpleDesktop.Desktop.ActiveViewContent as IDesignerPropertyHandler);
            if (editable != null)
                editable.ShowColorOfObjects = !editable.ShowColorOfObjects;
        }
    }

    /// <summary>
    /// Editor vlastních barev
    /// </summary>
    public class CustomColorEditor : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled { get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                return !(SimpleDesktop.Desktop.ActiveViewContent is AOfficeViewContent) && canEdit;
            }
        }

        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            using (ColorDialog cd = new ColorDialog())
            {
                List<int> customColors = new List<int>();
                foreach (var item in ColorService.UserDefineColors)
                    customColors.Add(ColorTranslator.ToOle(ColorService.HexToColor(item)));

                cd.CustomColors = customColors.ToArray();

                if (cd.ShowDialog() == DialogResult.OK)
                {
                    string name = cd.Color.Name.Length == 8 && cd.Color.Name.StartsWith("ff") ? '#' + cd.Color.Name.Substring(2) : cd.Color.Name;
                    ColorService.AddColorItem(name, name, cd.Color);

                    if (SimpleDesktop.Desktop.ActiveViewContent is Gordic.GFE.Parsers.DefaultEditor.ITextEditorControlProvider itecp)
                    {
                        if (itecp.TextEditorControl.ActiveTextAreaControl.SelectionManager.HasSomethingSelected)
                        {
                            itecp.TextEditorControl.ActiveTextAreaControl.TextArea.Caret.Position = itecp.TextEditorControl.ActiveTextAreaControl.TextArea.SelectionManager.SelectionCollection[0].StartPosition;
                            itecp.TextEditorControl.ActiveTextAreaControl.SelectionManager.RemoveSelectedText();
                        }
                        itecp.TextEditorControl.ActiveTextAreaControl.Document.Insert(itecp.TextEditorControl.ActiveTextAreaControl.Caret.Offset, ColorService.GetColorCZName(name).ToLower());
                    }
                }
            }
        }
    }

    /// <summary>
    /// Zobrazení skrytých objektů
    /// </summary>
    public class CheckHiddenObjects : AbstractCheckableMenuCommand
    {
        ISpecificFormat _editable;
        /// <exclude/>
        public override bool IsChecked
        {
            get
            {
                if (_editable == null)
                    _editable = (SimpleDesktop.Desktop.ActiveViewContent as ISpecificFormat);

                base.IsChecked = _editable != null && _editable.ViewHiddenObjects;
                return base.IsChecked;
            }
            set
            {
                base.IsChecked = value;
                if (_editable != null) _editable.ViewHiddenObjects = value;
            }
        }

        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                if (_editable == null)
                    _editable = (SimpleDesktop.Desktop.ActiveViewContent as ISpecificFormat);

                return _editable != null && _editable.EnableHiddenObjects;
            }
        }

        /// <summary>
        /// Změna statusu zobrazení mřížky
        /// </summary>
        public static void ChangeStatus()
        {
            ISpecificFormat editable = (SimpleDesktop.Desktop.ActiveViewContent as ISpecificFormat);
            if (editable != null)
                editable.ViewHiddenObjects = !editable.ViewHiddenObjects;
        }
    }

    /// <summary>
    /// Kopírování formátu
    /// </summary>
    class CopyFormat : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                IFormatHandler editable = (SimpleDesktop.Desktop.ActiveViewContent as IFormatHandler);
                return editable != null && editable.EnableCopyFormat && canEdit;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            (SimpleDesktop.Desktop.ActiveViewContent as IFormatHandler)?.CopyFormat();
        }
    }

    /// <summary>
    /// Aplikování formátu
    /// </summary>
    class ApplyFormat : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                IFormatHandler editable = (SimpleDesktop.Desktop.ActiveViewContent as IFormatHandler);
                return editable != null && editable.EnableApplyFormat && canEdit;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            (SimpleDesktop.Desktop.ActiveViewContent as IFormatHandler)?.ApplyFormat();
        }
    }

}
