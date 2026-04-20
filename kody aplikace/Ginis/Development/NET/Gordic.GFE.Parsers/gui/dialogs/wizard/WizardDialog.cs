//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.WizardDialog.cs                          </Name>
//    <Description> Průvodce                                                    </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Průvodce
    /// </summary>
    public class WizardDialog : System.Windows.Forms.Form
    {
        StatusPanel statusPanel = null;
        CurrentPanelPanel curPanel = null;

        Panel dialogPanel = new Panel();

        Stack idStack = new Stack();

        int activePanelNumber = 0;
        readonly EventHandler enableNextChangedHandler;
        readonly EventHandler enableCancelChangedHandler;
        readonly EventHandler nextWizardPanelIDChangedHandler;
        readonly EventHandler finishPanelHandler;

        ArrayList wizardPanels = new ArrayList();
        /// <summary>
        /// Panely průvodce
        /// </summary>
        public ArrayList WizardPanels { get { return wizardPanels; } }

        /// <summary>
        /// číslo aktivního panelu
        /// </summary>
        public int ActivePanelNumber { get { return activePanelNumber; } }

        /// <summary>
        /// Aktuální panel
        /// </summary>
        public IWizardPanel CurrentWizardPane { get { return (IWizardPanel)((IDialogPanelDescriptor)wizardPanels[activePanelNumber]).DialogPanel; } }

        bool CanFinish
        {
            get
            {
                int currentNr = 0;
                while (currentNr < wizardPanels.Count)
                {
                    IDialogPanelDescriptor descriptor = (IDialogPanelDescriptor)wizardPanels[currentNr];
                    if (!descriptor.DialogPanel.EnableFinish)
                        return false;
                    currentNr = GetSuccessorNumber(currentNr);
                }
                return true;
            }
        }

        /// <summary>
        /// objekt, pro zpětnou vazbu
        /// </summary>
        public object Customizer { get; set; }

        Label label1 = new Label();

        Button backButton = new Button();
        Button nextButton = new Button();
        Button finishButton = new Button();
        Button cancelButton = new Button();
        readonly Button helpButton = new Button();
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="title">titulek</param>
        /// <param name="customizer">přizpůsobení</param>
        /// <param name="treePath">konfigurační cesta</param>
        public WizardDialog(string title, object customizer, string treePath)
        {
            AddInTreeNode node = AddInTree.GetTreeNode(treePath);
            this.Text = title;
            Customizer = customizer;

            if (node != null)
                AddNodes(customizer, node.BuildChildItems<IDialogPanelDescriptor>(this));
            InitializeComponents();

            enableNextChangedHandler = new EventHandler(EnableNextChanged);
            nextWizardPanelIDChangedHandler = new EventHandler(NextWizardPanelIDChanged);
            enableCancelChangedHandler = new EventHandler(EnableCancelChanged);
            finishPanelHandler = new EventHandler(FinishPanelEvent);
            ActivatePanel(0);
        }

        /// <summary>
        /// číslo následovníka
        /// </summary>
        /// <param name="curNr">aktuální číslo</param>
        /// <returns></returns>
        public int GetSuccessorNumber(int curNr)
        {
            IWizardPanel panel = (IWizardPanel)((IDialogPanelDescriptor)wizardPanels[curNr]).DialogPanel;

            if (panel.IsLastPanel)
                return wizardPanels.Count + 1;

            int nextID = GetPanelNumber(panel.NextWizardPanelID);
            if (nextID < 0)
                return curNr + 1;
            return nextID;
        }

        int GetPanelNumber(string id)
        {
            for (int i = 0; i < wizardPanels.Count; ++i)
            {
                IDialogPanelDescriptor descriptor = (IDialogPanelDescriptor)wizardPanels[i];
                if (descriptor.ID == id)
                    return i;
            }
            return -1;
        }

        void InitializeComponents()
        {
            this.SuspendLayout();

            ShowInTaskbar = false;
            StartPosition = FormStartPosition.CenterScreen;
            FormBorderStyle = FormBorderStyle.FixedDialog;
            MinimizeBox = MaximizeBox = false;
            Icon = null;
            ClientSize = new Size(640, 440);

            int buttonSize = 92;
            int buttonYLoc = 464 - 2 * 24 - 4;
            int buttonXStart = Width - ((buttonSize + 4) * 4) - 14;

            label1.Size = new Size(Width - 4, 1);
            label1.BorderStyle = BorderStyle.Fixed3D;
            label1.Location = new Point(2, 404 - 2);
            label1.Anchor = AnchorStyles.Bottom | AnchorStyles.Right | AnchorStyles.Left;
            Controls.Add(label1);

            if (wizardPanels.Count > 1)
            {

                backButton.Text = "< " + GResources.GetResourceText(29450399); //RC 29450399 : Zpět
                backButton.Location = new Point(buttonXStart, buttonYLoc);
                backButton.ClientSize = new Size(buttonSize, 26);
                backButton.Click += new EventHandler(ShowPrevPanelEvent);
                backButton.FlatStyle = FlatStyle.System;
                backButton.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
                Controls.Add(backButton);

                nextButton.Text = GResources.GetResourceText(29450400) + " >"; //RC 29450400 : Další
                nextButton.Location = new Point(buttonXStart + buttonSize + 4, buttonYLoc);
                nextButton.ClientSize = new Size(buttonSize, 26);
                nextButton.Click += new EventHandler(ShowNextPanelEvent);
                nextButton.FlatStyle = FlatStyle.System;
                nextButton.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
                Controls.Add(nextButton);
            }
            finishButton.Text = GResources.GetResourceText(29450526); //RC 29450526 : Dokončit
            finishButton.Location = new Point(buttonXStart + 2 * (buttonSize + 4), buttonYLoc);
            finishButton.ClientSize = new Size(buttonSize, 26);
            finishButton.Click += new EventHandler(FinishEvent);
            finishButton.FlatStyle = FlatStyle.System;
            finishButton.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            Controls.Add(finishButton);

            cancelButton.Text = GResources.GetResourceText(29450402); //RC 29450402 : Zrušit
            cancelButton.Location = new Point(buttonXStart + 3 * (buttonSize + 4), buttonYLoc);
            cancelButton.ClientSize = new Size(buttonSize, 26);
            cancelButton.Click += new EventHandler(CancelEvent);
            cancelButton.FlatStyle = FlatStyle.System;
            cancelButton.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            Controls.Add(cancelButton);

            if (wizardPanels.Count > 1)
            {
                statusPanel = new StatusPanel(this)
                {
                    Location = new Point(2, 2),
                    Anchor = AnchorStyles.Bottom | AnchorStyles.Top | AnchorStyles.Left
                };
                Controls.Add(statusPanel);
            }

            curPanel = new CurrentPanelPanel(this)
            {
                Location = new Point(wizardPanels.Count > 1 ? 200 : 0, 2),
                Anchor = AnchorStyles.Right | AnchorStyles.Top | AnchorStyles.Left
            };
            Controls.Add(curPanel);

            dialogPanel.Location = new Point(wizardPanels.Count > 1 ? 200 : 0, 27);
            dialogPanel.Size = new Size(Width - 8 - (statusPanel != null ? statusPanel.Bounds.Right : 0),
                                               label1.Location.Y - dialogPanel.Location.Y);
            dialogPanel.Anchor = AnchorStyles.Right | AnchorStyles.Top | AnchorStyles.Left | AnchorStyles.Bottom;
            Controls.Add(dialogPanel);
            this.ResumeLayout(true);
        }
        void CheckFinishedState(object sender, EventArgs e)
        {
            finishButton.Enabled = CanFinish;
        }
        void AddNodes(object customizer, IEnumerable<IDialogPanelDescriptor> dialogPanelDescriptors)
        {
            foreach (IDialogPanelDescriptor descriptor in dialogPanelDescriptors)
            {
                if (descriptor.DialogPanel != null)
                {
                    descriptor.DialogPanel.EnableFinishChanged += new EventHandler(CheckFinishedState);
                    descriptor.DialogPanel.Wizard = this;
                    if (wizardPanels.Count > 0)
                        if (wizardPanels[wizardPanels.Count - 1] is IDialogPanelDescriptor dpd)
                            if (dpd.DialogPanel is AbstractWizardPanel awp)
                                awp.NextWizardPanelID = descriptor.ID;
                    descriptor.DialogPanel.CustomizationObject = customizer;
                    wizardPanels.Add(descriptor);
                }

                if (descriptor.ChildDialogPanelDescriptors != null)
                    AddNodes(customizer, descriptor.ChildDialogPanelDescriptors);
            }
        }
        void EnableCancelChanged(object sender, EventArgs e)
        {
            cancelButton.Enabled = CurrentWizardPane.EnableCancel;
        }
        void EnableNextChanged(object sender, EventArgs e)
        {
            nextButton.Enabled = CurrentWizardPane.EnableNext && GetSuccessorNumber(activePanelNumber) < wizardPanels.Count;
            backButton.Enabled = CurrentWizardPane.EnablePrevious && idStack.Count > 0;
        }
        void NextWizardPanelIDChanged(object sender, EventArgs e)
        {
            EnableNextChanged(null, null);
            finishButton.Enabled = CanFinish;
            if (statusPanel != null) statusPanel.Refresh();
        }
        void ActivatePanel(int number)
        {
            if (CurrentWizardPane != null)
            {
                CurrentWizardPane.EnableNextChanged -= enableNextChangedHandler;
                CurrentWizardPane.EnableCancelChanged -= enableCancelChangedHandler;
                CurrentWizardPane.EnablePreviousChanged -= enableNextChangedHandler;
                CurrentWizardPane.NextWizardPanelIDChanged -= nextWizardPanelIDChangedHandler;
                CurrentWizardPane.IsLastPanelChanged -= nextWizardPanelIDChangedHandler;
                CurrentWizardPane.FinishPanelRequested -= finishPanelHandler;
            }

            activePanelNumber = number;

            if (CurrentWizardPane != null)
            {
                CurrentWizardPane.EnableNextChanged += enableNextChangedHandler;
                CurrentWizardPane.EnableCancelChanged += enableCancelChangedHandler;
                CurrentWizardPane.EnablePreviousChanged += enableNextChangedHandler;
                CurrentWizardPane.NextWizardPanelIDChanged += nextWizardPanelIDChangedHandler;
                CurrentWizardPane.IsLastPanelChanged += nextWizardPanelIDChangedHandler;
                CurrentWizardPane.FinishPanelRequested += finishPanelHandler;
            }

            EnableNextChanged(null, null);
            NextWizardPanelIDChanged(null, null);
            EnableCancelChanged(null, null);

            if (statusPanel != null) statusPanel.Refresh();
            curPanel.Refresh();
            dialogPanel.Controls.Clear();

            Control panelControl = CurrentWizardPane.Control;
            panelControl.Dock = DockStyle.Fill;
            dialogPanel.Controls.Add(panelControl);

        }
        void FinishPanelEvent(object sender, EventArgs e)
        {
            AbstractWizardPanel panel = (AbstractWizardPanel)CurrentWizardPane;
            bool isLast = panel.IsLastPanel;
            panel.IsLastPanel = false;
            ShowNextPanelEvent(sender, e);
            panel.IsLastPanel = isLast;
        }
        void ShowNextPanelEvent(object sender, EventArgs e)
        {
            int nextID = GetSuccessorNumber(this.ActivePanelNumber);
            if (nextID >= wizardPanels.Count || nextID < 0)
                return;
            //System.Diagnostics.Debug.Assert(nextID < wizardPanels.Count && nextID >= 0);
            if (!CurrentWizardPane.ReceiveDialogMessage(DialogMessage.next))
                return;
            idStack.Push(activePanelNumber);
            ActivatePanel(nextID);
            CurrentWizardPane.ReceiveDialogMessage(DialogMessage.activated);
        }
        void ShowPrevPanelEvent(object sender, EventArgs e)
        {
            System.Diagnostics.Debug.Assert(idStack.Count > 0);
            if (!CurrentWizardPane.ReceiveDialogMessage(DialogMessage.prev))
                return;
            ActivatePanel((int)idStack.Pop());
        }
        void FinishEvent(object sender, EventArgs e)
        {
            foreach (IDialogPanelDescriptor descriptor in wizardPanels)
                if (!descriptor.DialogPanel.ReceiveDialogMessage(DialogMessage.finish))
                    return;
            DialogResult = DialogResult.OK;
        }
        void CancelEvent(object sender, EventArgs e)
        {
            foreach (IDialogPanelDescriptor descriptor in wizardPanels)
                if (!descriptor.DialogPanel.ReceiveDialogMessage(DialogMessage.cancel))
                    return;
            DialogResult = DialogResult.Cancel;
        }
        void HelpEvent(object sender, EventArgs e)
        {
            CurrentWizardPane.ReceiveDialogMessage(DialogMessage.help);
        }
        void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(WizardDialog));
            this.SuspendLayout();
            // 
            // WizardDialog
            // 
            resources.ApplyResources(this, "$this");
            this.Name = "WizardDialog";
            this.ResumeLayout(false);

        }
    }
}
