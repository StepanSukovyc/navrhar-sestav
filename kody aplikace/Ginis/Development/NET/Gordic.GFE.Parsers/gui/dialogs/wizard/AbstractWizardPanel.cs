//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Gui.AbstractWizardPanel.cs                   </Name>
//    <Description> Abstractní třída panelu průvodce                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Abstractní třída panelu průvodce
    /// </summary>
    public abstract class AbstractWizardPanel : AbstractOptionPanel, IWizardPanel
    {
        string nextWizardPanelID = String.Empty;
        bool enablePrevious = true;
        bool enableNext = true;
        bool isLastPanel = false;
        bool enableCancel = true;
        /// <summary>
        /// Následující panel
        /// </summary>
        public string NextWizardPanelID
        {
            get { return nextWizardPanelID; }
            set
            {
                if (nextWizardPanelID != value)
                {
                    nextWizardPanelID = value;
                    OnNextWizardPanelIDChanged(EventArgs.Empty);
                }
            }
        }
        /// <summary>
        /// je poslední?
        /// </summary>
        public bool IsLastPanel
        {
            get { return isLastPanel; }
            set
            {
                if (isLastPanel != value)
                {
                    isLastPanel = value;
                    OnIsLastPanelChanged(EventArgs.Empty);
                }
            }
        }
        /// <summary>
        /// umožňuje přechod na další panel
        /// </summary>
        public virtual bool EnableNext
        {
            get { return enableNext; }
            set
            {
                if (enableNext != value)
                    enableNext = value;
                OnEnableNextChanged(EventArgs.Empty);
            }
        }
        /// <summary>
        /// umožňuje přechod na předchozí panel
        /// </summary>
        public bool EnablePrevious
        {
            get { return enablePrevious; }
            set
            {
                if (enablePrevious != value)
                {
                    enablePrevious = value;
                    OnEnablePreviousChanged(EventArgs.Empty);
                }
            }
        }
        /// <summary>
        /// povoleno rušení průvodce
        /// </summary>
        public bool EnableCancel
        {
            get { return enableCancel; }
            set
            {
                if (enableCancel != value)
                {
                    enableCancel = value;
                    OnEnableCancelChanged(EventArgs.Empty);
                }
            }
        }

        /// <summary>
        /// Vytvoření  nové instance třídy
        /// </summary>
        public AbstractWizardPanel()
            : base()
        {
        }
        /// <summary>
        /// Ukončení panelu
        /// </summary>
        public virtual void FinishPanel()
        {
            FinishPanelRequested?.Invoke(this, EventArgs.Empty);
        }
        /// <exclude/>
        protected virtual void OnEnableNextChanged(EventArgs e)
        {
            EnableNextChanged?.Invoke(this, e);
        }

        /// <exclude/>
        protected virtual void OnEnablePreviousChanged(EventArgs e)
        {
            EnablePreviousChanged?.Invoke(this, e);
        }

        /// <exclude/>
        protected virtual void OnEnableCancelChanged(EventArgs e)
        {
            EnableCancelChanged?.Invoke(this, e);
        }

        /// <exclude/>
        protected virtual void OnNextWizardPanelIDChanged(EventArgs e)
        {
            NextWizardPanelIDChanged?.Invoke(this, e);
        }

        /// <exclude/>
        protected virtual void OnIsLastPanelChanged(EventArgs e)
        {
            IsLastPanelChanged?.Invoke(this, e);
        }

        /// <exclude/>
        public event EventHandler EnablePreviousChanged;
        /// <exclude/>
        public event EventHandler EnableNextChanged;
        /// <exclude/>
        public event EventHandler EnableCancelChanged;
        /// <exclude/>
        public event EventHandler NextWizardPanelIDChanged;
        /// <exclude/>
        public event EventHandler IsLastPanelChanged;
        /// <exclude/>
        public event EventHandler FinishPanelRequested;

        private void InitializeComponent()
        {
            this.SuspendLayout();
            // 
            // AbstractWizardPanel
            // 
            this.Name = "AbstractWizardPanel";
            this.ResumeLayout(false);

        }
    }
}
