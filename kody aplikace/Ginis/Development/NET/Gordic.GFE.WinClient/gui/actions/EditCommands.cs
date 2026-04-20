//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.EditComands.cs                         </Name>
//    <Description> Operace Zpět                                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using System.Linq;
using Gordic.GFE.Parsers;
using System.Windows.Forms;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.WinForm;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.Parsers.UndoRedoFramework;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.General;
using System;


namespace Gordic.GFE.WinClient.EditCommands
{
    /// <summary>
    /// Operace Zpět
    /// </summary>
    class Undo : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                IUndoHandler editable = (SimpleDesktop.ActiveControl as IUndoHandler) ?? (SimpleDesktop.Desktop.ActiveViewContent as IUndoHandler);
                //IUndoHandler editable = (SimpleDesktop.Desktop.ActiveViewContent as IUndoHandler) ?? (SimpleDesktop.ActiveControl as IUndoHandler);
                if (editable != null)
                    return editable.EnableUndo;
                else if (SimpleDesktop.ActiveControl is TextBoxBase textBox)
                    return textBox.CanUndo;
                return false;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            IUndoHandler editable = (SimpleDesktop.ActiveControl as IUndoHandler) ?? (SimpleDesktop.Desktop.ActiveViewContent as IUndoHandler);
            //IUndoHandler editable = (SimpleDesktop.Desktop.ActiveViewContent as IUndoHandler) ?? (SimpleDesktop.ActiveControl as IUndoHandler);
            if (editable != null)
                editable.Undo();
            else if (SimpleDesktop.ActiveControl is TextBoxBase textBox)
                textBox.Undo();
        }
    }

    /// <summary>
    /// Operace Znovu
    /// </summary>
    class Redo : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                IUndoHandler editable = (SimpleDesktop.Desktop.ActiveViewContent as IUndoHandler) ?? (SimpleDesktop.ActiveControl as IUndoHandler);
                return editable != null && editable.EnableRedo;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            IUndoHandler editable = (SimpleDesktop.Desktop.ActiveViewContent as IUndoHandler) ?? (SimpleDesktop.ActiveControl as IUndoHandler);
            editable?.Redo();
        }
    }

    /// <summary>
    /// Vybrat vše
    /// </summary>
    class SetNewParameters : AbstractMenuCommand
    {
        IPropertyHandler editable;

        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IPropertyHandler;
                return editable != null && editable.EnableSetNewParameters;
            }
        }

        /// <summary>
        /// spuštění operace
        /// </summary>
        public override void Run()
        {
            editable.SetNewParameters();
        }
    }

    /// <summary>
    /// Abstraktní třída operaci do schránky
    /// </summary>
    abstract class AbstractClipboardCommand : AbstractMenuCommand
    {
        /// <summary>
        /// Získání indikátoru možností úprav
        /// </summary>
        /// <param name="editable">Je editoatelný</param>
        /// <returns></returns>
        protected abstract bool GetEnabled(IClipboardHandler editable);
        /// <summary>
        /// Spuštění akce
        /// </summary>
        /// <param name="editable">editovatelnost</param>
        protected abstract void Run(IClipboardHandler editable);

        /// <summary>
        /// Získání wrapperu
        /// </summary>
        /// <param name="ctl">ovlsadač</param>
        /// <returns></returns>
        public static IClipboardHandler GetClipboardHandlerWrapper(Control ctl)
        {
            if (ctl is TextBoxBase tb)
                return new TextBoxWrapper(tb);
            if (ctl is ComboBox cb && cb.DropDownStyle != ComboBoxStyle.DropDownList)
                return new ComboBoxWrapper(cb);
            if (ctl is IEditControl ec)
                return new EditControlWrapper(ec);

            return ctl as IClipboardHandler;
        }

        class TextBoxWrapper : IClipboardHandler
        {
            TextBoxBase textBox;
            public TextBoxWrapper(TextBoxBase textBox)
            {
                this.textBox = textBox;
            }
            public bool EnableCut
            {
                get => !textBox.ReadOnly && textBox.SelectionLength > 0;
            }
            public bool EnableCopy
            {
                get => textBox.SelectionLength > 0;
            }
            public bool EnablePaste
            {
                get => !textBox.ReadOnly;
            }
            public bool EnableDelete
            {
                get => !textBox.ReadOnly && textBox.SelectionLength > 0;
            }
            public bool EnableSelectAll
            {
                get => textBox.TextLength > 0;
            }
            /// <summary>
            /// Získání polička nad kterým se provedou operace 
            /// </summary>
            public virtual Control TextBoxControl { get => textBox; }

            public void Cut() { textBox.Cut(); }
            public void Copy() { textBox.Copy(); }
            public void Paste() { textBox.Paste(); }
            public void Delete() { textBox.SelectedText = ""; }
            public void SelectAll() { textBox.SelectAll(); }
        }

        class EditControlWrapper : IClipboardHandler
        {
            readonly IEditControl textBox;
            public EditControlWrapper(IEditControl textBox)
            {
                this.textBox = textBox;
            }
            public bool EnableCut
            {
                get => false;
            }
            public bool EnableCopy
            {
                get => false;
            }
            public bool EnablePaste
            {
                get => false;
            }
            public bool EnableDelete
            {
                get => false;
            }
            public bool EnableSelectAll
            {
                get => false;
            }
            /// <summary>
            /// Získání polička nad kterým se provedou operace 
            /// </summary>
            public virtual Control TextBoxControl { get => textBox as LtbControl; }

            public void Cut() { }
            public void Copy() { }
            public void Paste() { }
            public void Delete() { }
            public void SelectAll() { }
        }

        class ComboBoxWrapper : IClipboardHandler
        {
            ComboBox comboBox;
            public ComboBoxWrapper(ComboBox comboBox)
            {
                this.comboBox = comboBox;
            }
            public bool EnableCut
            {
                get => comboBox.SelectionLength > 0;
            }
            public bool EnableCopy
            {
                get => comboBox.SelectionLength > 0;
            }
            public bool EnablePaste
            {
                get => ClipboardHandling.GetClipboardContainsText();
            }
            public bool EnableDelete
            {
                get => true;
            }
            public bool EnableSelectAll
            {
                get => comboBox.Text.Length > 0;
            }
            /// <summary>
            /// Získání polička nad kterým se provedou operace 
            /// </summary>
            public virtual Control TextBoxControl { get => comboBox; }

            public void Cut() { ClipboardWrapper.SetText(comboBox.SelectedText); comboBox.SelectedText = string.Empty; }
            public void Copy() { ClipboardWrapper.SetText(comboBox.SelectedText); }
            public void Paste() { comboBox.SelectedText = ClipboardWrapper.GetText(); }
            public void Delete() { comboBox.SelectedText = string.Empty; }
            public void SelectAll() { comboBox.SelectAll(); }
        }
        /// <summary>
        /// Indikuje dostupnost
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                IClipboardHandler editable = GetClipboardHandlerWrapper(SimpleDesktop.ActiveControl) ?? SimpleDesktop.Desktop.ActiveContent as IClipboardHandler;
                return editable != null && GetEnabled(editable) && canEdit;
            }
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            IClipboardHandler activeControl = GetClipboardHandlerWrapper(SimpleDesktop.ActiveControl);
            if (!(SimpleDesktop.Desktop.ActiveContent is IClipboardHandler editable)
                || activeControl != null)
                editable = activeControl;

            if (editable != null)
                Run(editable);
        }
    }

    /// <summary>
    /// Reakce na příkaz Vyjmout
    /// </summary>
    class Cut : AbstractClipboardCommand
    {
        /// <summary>
        /// Získání dostupnosti
        /// </summary>
        /// <param name="editable">editovatelnost</param>
        /// <returns></returns>
        protected override bool GetEnabled(IClipboardHandler editable) => editable.EnableCut;
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        /// <param name="editable">editovatelnost</param>
        protected override void Run(IClipboardHandler editable) { editable.Cut(); }
    }

    /// <summary>
    /// Reakce na kopírování
    /// </summary>
    class Copy : AbstractClipboardCommand
    {
        /// <summary>
        /// Získání dostupností operace
        /// </summary>
        /// <param name="editable">objekt</param>
        /// <returns></returns>
        protected override bool GetEnabled(IClipboardHandler editable) => editable.EnableCopy;
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        /// <param name="editable">objekt</param>
        protected override void Run(IClipboardHandler editable) { Copy.Execute(editable); }

        /// <summary>
        /// Provedení akce
        /// </summary>
        /// <param name="editable">Ovladač akce</param>
        public static void Execute(IClipboardHandler editable)
        {
            editable?.Copy();
        }
    }
    /// <summary>
    /// Reakce na vložení
    /// </summary>
    class Paste : AbstractClipboardCommand
    {
        /// <summary>
        /// Dostupnost
        /// </summary>
        /// <param name="editable">objekt</param>
        /// <returns></returns>
        protected override bool GetEnabled(IClipboardHandler editable) => editable.EnablePaste;
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        /// <param name="editable">objekt nad kterým se příkaz spouští</param>
        protected override void Run(IClipboardHandler editable) { editable.Paste(); }
    }
    /// <summary>
    /// Reakce na odstranění
    /// </summary>
    class Delete : AbstractClipboardCommand
    {
        /// <summary>
        /// Dostupnost operace
        /// </summary>
        /// <param name="editable">nad objektem</param>
        /// <returns></returns>
        protected override bool GetEnabled(IClipboardHandler editable) => editable.EnableDelete;
        /// <summary>
        /// spuštění operace
        /// </summary>
        /// <param name="editable">nad objektem</param>
        protected override void Run(IClipboardHandler editable) { Delete.Execute(editable); }

        /// <summary>
        /// Provedení akce
        /// </summary>
        /// <param name="editable">Ovladač akce</param>
        public static void Execute(IClipboardHandler editable)
        {
            editable?.Delete();

            if (UndoRedoService.IsTransactionStarted)
                UndoRedoService.Commit();
        }
    }

    /// <summary>
    /// Reakce na odstranění
    /// </summary>
    class DeleteContent : AbstractMenuCommand
    {
        /// <summary>
        /// dostupnost operace
        /// </summary>
        public override bool IsEnabled
        {
            get => ServiceService.ServiceSelection != null
                    && ServiceService.ServiceSelection.SelectedComponents != null
                    && ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => cmp is IParentable
                        && (cmp as IParentable).Parent is IGRRCell
                        && !((cmp as IParentable).Parent as IGRRCell).IsEmpty); // potřebujeme aby buňka nebyla prázdna
        }

        /// <summary>
        /// spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsEnabled)
                    try
                    {
                        List<URAbstractContainer> selected = ServiceService.ServiceSelection.SelectedComponents
                            .Select(cmp => cmp is IParentable
                                && (cmp as IParentable).Parent is URAbstractContainer
                                ? (cmp as IParentable).Parent as URAbstractContainer : null)
                            .Distinct()
                            .ToList()
                            .FindAll(cm => cm != null);

                        if (selected.Count != 0)
                            using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450435))) //RC 29450435 : odstranění obsahu vybraných objektů
                            {
                                selected.ForEach(DeleteContent.Execute);
                                UndoRedoService.Commit();
                            }
                    }
                    catch (Exception ex)
                    {
                        LoggingService.Error(ex.Message);
                    }
            });
        }

        /// <summary>
        /// odstranění obsahu buňky
        /// </summary>
        /// <param name="container">kontainer s obsahem, který se odstraní (nahradí prázdným textovým polem)</param>
        public static void Execute(URAbstractContainer container)
        {
            container?.DeleteContent();
        }
    }

    /// <summary>
    /// Vybrat vše
    /// </summary>
    class DeleteBackImage : AbstractMenuCommand
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

                IBackground editable = null;
                if (SimpleDesktop.Desktop.ActiveViewContent is IHost)
                    if ((SimpleDesktop.Desktop.ActiveViewContent as IHost).ServiceSelection != null)
                        editable = (SimpleDesktop.Desktop.ActiveViewContent as IHost).ServiceSelection.SelectedComponents.Find(cmp => cmp is IBackground) as IBackground;

                return editable != null && editable.BackImage != null && canEdit;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            IBackground editable = null;
            if (SimpleDesktop.Desktop.ActiveViewContent is IHost)
                if ((SimpleDesktop.Desktop.ActiveViewContent as IHost).ServiceSelection != null)
                    editable = (SimpleDesktop.Desktop.ActiveViewContent as IHost).ServiceSelection.SelectedComponents.Find(cmp => cmp is IBackground) as IBackground;
            if (editable != null && editable.BackImage != null)
            {
                if (!UndoRedoService.IsTransactionStarted)
                    UndoRedoService.StartTransaction(GResources.GetResourceText(29450436)); //RC 29450436 : odstranění obrázku pozadí

                (editable as IBackground).BackImage = null;

                if (UndoRedoService.IsTransactionStarted)
                    UndoRedoService.Commit();
            }
        }
    }
    /// <summary>
    /// Vybrat vše
    /// </summary>
    class SelectAll : AbstractClipboardCommand
    {
        /// <summary>
        /// Dostupnost operace
        /// </summary>
        /// <param name="editable">nad objektem</param>
        /// <returns></returns>
        protected override bool GetEnabled(IClipboardHandler editable) => editable.EnableSelectAll;
        /// <summary>
        /// spuštění operace
        /// </summary>
        /// <param name="editable">nad objektem</param>
        protected override void Run(IClipboardHandler editable) { editable.SelectAll(); }
    }

}
