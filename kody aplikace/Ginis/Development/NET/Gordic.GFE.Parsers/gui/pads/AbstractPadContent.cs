//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AbstractPadContent.cs                  </Name>
//    <Description> abstractní třída záložek                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-07-05                                                  </Created>
//  </FileHeader>

using System;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Docking;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// obsah okýnka
    /// </summary>
    public sealed class PadContentWrapper : DockContent
    {
        PadDescriptor padDescriptor;
        bool isInitialized = false;
        bool allowInitialize = false;
        /// <summary>
        /// indikuje dostupnost operace inicializace
        /// </summary>
        public bool AllowInitialize { get => allowInitialize; set => allowInitialize = value; }

        /// <summary>
        /// Obsah podložky
        /// </summary>
        public IPadContent PadContent { get => padDescriptor.PadContent; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="padDescriptor">Popisovač podložky</param>
        public PadContentWrapper(PadDescriptor padDescriptor)
        {
            this.padDescriptor = padDescriptor ?? throw new ArgumentNullException("padDescriptor");
            this.DockAreas = DockAreas.Float | DockAreas.DockLeft | DockAreas.DockRight | DockAreas.DockTop | DockAreas.DockBottom;
            HideOnClose = true;
        }

        /// <summary>
        /// Odpojení obsahu
        /// </summary>
        public void DetachContent()
        {
            Controls.Clear();
            padDescriptor = null;
        }
        /// <summary>
        /// Umožňuje inicializací obsahu.
        /// Se používá, aby se zabránilo inicializace všech zobrazení obsahu při změně rozložení konfigurace.
        /// </summary>
        public void SetAllowInitialize()
        {
            allowInitialize = true;
            if (Visible && Width > 0)
                ActivateContent();
        }

        /// <exclude/>
        public override string ToString() { return "[PadContentWrapper " + padDescriptor.Class + "]"; }

        /// <exclude/>
        protected override void OnVisibleChanged(EventArgs e)
        {
            base.OnVisibleChanged(e);
            if (Visible && Width > 0)
                ActivateContent();
        }
        /// <exclude/>
        protected override void OnSizeChanged(EventArgs e)
        {
            base.OnSizeChanged(e);
            if (Visible && Width > 0)
                ActivateContent();
        }
        /// <exclude/>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            if (disposing && padDescriptor != null)
            {
                padDescriptor.Dispose();
                padDescriptor = null;
            }
        }

        /// <exclude/>
        protected override string GetPersistString() { return padDescriptor.Class; }

        void ActivateContent()
        {
            if (!allowInitialize)
                return;
            if (!isInitialized)
            {
                isInitialized = true;
                IPadContent content = padDescriptor.PadContent;
                if (content == null)
                    return;
                try
                {
                    Control control = content.Control;
                    control.Dock = DockStyle.Fill;
                    Controls.Add(control);
                }
                catch (Exception ex) { MessageService.ShowError(ex, GResources.GetResourceText(29450412) + " IPadContent.Control!"); } //RC 29450412 : Chyba v
            }
        }

        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(PadContentWrapper));
            this.SuspendLayout();
            // 
            // PadContentWrapper
            // 
            resources.ApplyResources(this, "$this");
            this.Name = "PadContentWrapper";
            this.ResumeLayout(false);

        }
    }

    /// <summary>
    /// abstractní třída záložek
    /// </summary>
    abstract public class AbstractPadContent : IPadContent
    {
        #region IDisposable
        /// <summary>
        /// Uvolnění záložky
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        /// <param name="disposing">indikuje uvolnění</param>
        protected virtual void Dispose(bool disposing) { }
        /// <summary>
        /// ukončení práce s objektem
        /// </summary>
        ~AbstractPadContent() { Dispose(false); }
        #endregion
        /// <summary>
        /// Ovladač uvnitř záložky
        /// </summary>
        public abstract Control Control { get; }

        /// <summary>
        /// Překreslení obsahu záložky
        /// </summary>
        public virtual void RedrawContent() { }

        /// <summary>
        /// Přenesení záložky do popředí
        /// </summary>
        /// <param name="layout">Rozvržení pracovní plochy</param>
        public void BringToFront(IDesktopLayout layout)
        {
            this.PadDescriptor?.BringPadToFront(layout);
        }

        /// <summary>
        /// Descriptor záložky
        /// </summary>
        protected virtual PadDescriptor PadDescriptor
        {
            get => ProcessService.Desktop?.DesktopLayout == null ? null : ProcessService.Desktop.GetPad(GetType());
        }

        /// <summary>
        /// Indikuje viditelnost záložky
        /// </summary>
        public bool IsVisible
        {
            get => this.Control.Visible && this.Control.Width > 0 && this.Control.Height > 0;
        }
    }
}
