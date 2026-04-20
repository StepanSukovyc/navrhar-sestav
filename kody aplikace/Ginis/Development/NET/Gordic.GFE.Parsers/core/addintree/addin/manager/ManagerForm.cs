//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ManagerForm.cs                           </Name>
//    <Description> okno správce doplòkù                                        </Description>
//    <Author>      Mgr. Stepan Sukovyè                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-07-02                                                  </Created>
//  </FileHeader>

using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace Gordic.GFE.Parsers.AddInManager
{
    /// <summary>
    /// okno správce doplòkù
    /// </summary>
    public class ManagerForm : System.Windows.Forms.Form
    {
        #region Form Initialization
        static ManagerForm instance;
        /// <summary>
        /// instance okna správce
        /// </summary>
        public static ManagerForm Instance { get { return instance; } }

        /// <summary>
        /// zobrazení správce
        /// </summary>
        public static void ShowForm()
        {
            if (instance == null)
            {
                instance = new ManagerForm
                {
                    Owner = ProcessService.Desktop.MainForm
                };
                instance.Show();
            }
            else
                instance.Activate();
        }

        /// <summary>
        /// konstruktor tøídy
        /// </summary>
        public ManagerForm()
        {
            //
            // The InitializeComponent() call is required for Windows Forms designer support.
            //
            InitializeComponent();

            actionFlowLayoutPanel.BackgroundImage = WinFormsResourceService.GetBitmap("Icons__Gin__logo_gordic_modul");
            actionFlowLayoutPanel.BackgroundImageLayout = ImageLayout.Center;

            installButton.Text = GResources.GetResourceText(29450542);
            uninstallButton.Text = GResources.GetResourceText(29450543);
            closeButton.Text = GResources.GetResourceText(29450544);
            showPreinstalledAddInsCheckBox.Text = GResources.GetResourceText(29450545);
            this.Text = GResources.GetResourceText(29450546);

            CreateAddInList();
        }

        void OnSplitContainerPanel1Paint(object sender, PaintEventArgs e)
        {
            if (visibleAddInCount == 0)
            {
                Rectangle rect = splitContainer.Panel1.ClientRectangle;
                rect.Offset(16, 16);
                rect.Inflate(-32, -32);
                e.Graphics.DrawString(GResources.GetResourceText(29450547), Font, SystemBrushes.WindowText, rect);
            }
        }
        void CreateAddInList()
        {
            Stack<AddInControl> stack = new Stack<AddInControl>();
            int index = 0;
            AddInControl addInControl;

            List<AddIn> addInList = new List<AddIn>(AddInTree.AddIns);
            addInList.Sort(delegate (AddIn a, AddIn b) { return a.Name.CompareTo(b.Name); });

            bool hasPreinstalledAddIns = false;
            foreach (AddIn addIn in addInList)
            {
                if (string.Equals(addIn.Properties["addInManagerHidden"], "true", StringComparison.OrdinalIgnoreCase)
                //&& IsInstalledInApplicationRoot(addIn)
                )
                {
                    hasPreinstalledAddIns = true;
                    continue;
                }
                addInControl = new AddInControl(addIn)
                {
                    Dock = DockStyle.Top,
                    TabIndex = index++
                };
                stack.Push(addInControl);
                addInControl.Enter += OnControlEnter;
                addInControl.Click += OnControlClick;
            }
            while (stack.Count > 0)
                splitContainer.Panel1.Controls.Add(stack.Pop());

            ShowPreinstalledAddInsCheckBoxCheckedChanged(null, null);

            if (!hasPreinstalledAddIns)
                showPreinstalledAddInsCheckBox.Visible = false;
            splitContainer.Panel2Collapsed = true;
        }
        void RefreshAddInList()
        {
            List<AddIn> oldSelected = selected;
            foreach (Control ctl in splitContainer.Panel1.Controls)
                ctl.Dispose();
            splitContainer.Panel1.Controls.Clear();
            CreateAddInList();
            if (oldSelected != null)
                foreach (AddInControl ctl in splitContainer.Panel1.Controls)
                    if (oldSelected.Contains(ctl.AddIn))
                        ctl.Selected = true;

            UpdateActionBox();
        }
        #endregion

        #region AddInList-Správce
        int visibleAddInCount = 0;
        AddInControl oldFocus;
        bool ignoreFocusChange;

        static bool IsInstalledInApplicationRoot(AddIn addin)
        {
            return FileUtility.IsBaseDirectory(FileUtility.ApplicationRootPath, addin.FileName);
        }

        void OnControlClick(object sender, EventArgs e)
        {
            if (((Control)sender).Focused)
                OnControlEnter(sender, e);
        }
        void ShowPreinstalledAddInsCheckBoxCheckedChanged(object sender, EventArgs e)
        {
            visibleAddInCount = 0;
            foreach (AddInControl ctl in splitContainer.Panel1.Controls)
            {
                ctl.Selected = false;
                bool visible;
                if (showPreinstalledAddInsCheckBox.Checked)
                    visible = true;
                else
                {
                    if (ctl == oldFocus)
                        oldFocus = null;
                    if (IsInstalledInApplicationRoot(ctl.AddIn))
                        visible = !string.Equals(ctl.AddIn.Properties["addInManagerHidden"], "preinstalled", StringComparison.OrdinalIgnoreCase);
                    else
                        visible = true;
                }

                if (visible)
                    visibleAddInCount += 1;
                ctl.Visible = visible;
            }

            UpdateActionBox();
        }
        void OnControlEnter(object sender, EventArgs e)
        {
            if (ignoreFocusChange)
                return;
            bool ctrl = (ModifierKeys & Keys.Control) == Keys.Control;
            if ((ModifierKeys & Keys.Shift) == Keys.Shift && sender != oldFocus)
            {
                bool sel = false;
                foreach (AddInControl ctl in splitContainer.Panel1.Controls)
                {
                    if (!ctl.Visible) continue;
                    if (ctl == sender || ctl == oldFocus)
                    {
                        sel = !sel;
                        ctl.Selected = true;
                    }
                    else
                        if (sel || !ctrl)
                        ctl.Selected = sel;
                }
            }
            else if (ctrl)
            {
                foreach (AddInControl ctl in splitContainer.Panel1.Controls)
                    if (ctl == sender)
                        ctl.Selected = !ctl.Selected;
                oldFocus = (AddInControl)sender;
            }
            else
            {
                foreach (AddInControl ctl in splitContainer.Panel1.Controls)
                    ctl.Selected = ctl == sender;
                oldFocus = (AddInControl)sender;
            }

            UpdateActionBox();
        }
        #endregion

        #region UpdateActionBox
        List<AddIn> selected;
        AddInAction selectedAction;
        enum ShowDependencyMode
        {
            Disable,
            Enable,
            CancelUpdate
        }

        static bool IsErrorAction(AddInAction action)
        {
            return action == AddInAction.DependencyError
                || action == AddInAction.InstalledTwice
                || action == AddInAction.CustomError;
        }

        bool ShowDependencies(IList<AddIn> addIns, ShowDependencyMode mode)
        {
            List<AddInReference> dependencies = new List<AddInReference>(); // používá se pouze u enable=true
            List<KeyValuePair<AddIn, AddInReference>> dependenciesToSel = new List<KeyValuePair<AddIn, AddInReference>>();
            Dictionary<string, Version> addInDict = new Dictionary<string, Version>();
            Dictionary<string, Version> modifiedAddIns = new Dictionary<string, Version>();

            // pøidat dostupný doplnìk
            foreach (AddIn addIn in AddInTree.AddIns)
            {
                if (addIn.Action != AddInAction.Enable && addIn.Action != AddInAction.Install)
                    continue;
                if (addIns.Contains(addIn))
                    continue;

                foreach (KeyValuePair<string, Version> pair in addIn.Manifest.Identities)
                    addInDict[pair.Key] = pair.Value;
            }

            // vytvoøit seznam modifikovaných jmen doplòkù
            foreach (AddIn addIn in addIns)
                foreach (KeyValuePair<string, Version> pair in addIn.Manifest.Identities)
                    modifiedAddIns[pair.Key] = pair.Value;

            // pøidat nový doplnìk
            if (mode != ShowDependencyMode.Disable)
                foreach (AddIn addIn in addIns)
                {
                    if (mode == ShowDependencyMode.CancelUpdate && !addIn.Enabled)
                        continue;

                    foreach (KeyValuePair<string, Version> pair in addIn.Manifest.Identities)
                        addInDict[pair.Key] = pair.Value;

                    foreach (AddInReference dep in addIn.Manifest.Dependencies)
                        if (!dependencies.Contains(dep))
                            dependencies.Add(dep);
                }

            // pøidat závislosti na doplnìk, který bude-pozmìnìn
            foreach (AddIn addIn in AddInTree.AddIns)
            {
                if (addIn.Action != AddInAction.Enable && addIn.Action != AddInAction.Install)
                    continue;

                if (addIns.Contains(addIn))
                    continue;

                foreach (AddInReference dep in addIn.Manifest.Dependencies)
                    if (modifiedAddIns.ContainsKey(dep.Name))
                        dependenciesToSel.Add(new KeyValuePair<AddIn, AddInReference>(addIn, dep));
            }

            foreach (Control ctl in dependencyTable.Controls)
                ctl.Dispose();

            dependencyTable.Controls.Clear();
            bool allDepenciesOK = true;
            if (dependencies.Count > 0 || dependenciesToSel.Count > 0)
            {
                if (dependencies.Count == 0)
                    dependencyTable.RowCount = 1 + dependenciesToSel.Count;
                else if (dependenciesToSel.Count == 0)
                    dependencyTable.RowCount = 1 + dependencies.Count;
                else
                    dependencyTable.RowCount = 2 + dependencies.Count + dependenciesToSel.Count;

                while (dependencyTable.RowStyles.Count < dependencyTable.RowCount)
                    dependencyTable.RowStyles.Add(new RowStyle(SizeType.AutoSize));

                int rowIndex = 0;
                if (dependencies.Count > 0)
                {
                    AddLabelRow(rowIndex++, GResources.GetResourceText(29450548) + ":");
                    foreach (AddInReference dep in dependencies)
                        if (!AddDependencyRow(addInDict, dep, rowIndex++, null))
                            allDepenciesOK = false;
                }
                if (dependenciesToSel.Count > 0)
                {
                    AddLabelRow(rowIndex++, GResources.GetResourceText(29450549) + ":");
                    foreach (KeyValuePair<AddIn, AddInReference> pair in dependenciesToSel)
                        if (!AddDependencyRow(addInDict, pair.Value, rowIndex++, pair.Key.Name))
                            allDepenciesOK = false;
                }

                dependencyTable.Visible = true;
            }

            return allDepenciesOK;
        }
        bool AddDependencyRow(Dictionary<string, Version> addInDict, AddInReference dep, int rowIndex, string requiredByName)
        {
            string text = requiredByName ?? GetDisplayName(dep.Name);
            Label label = new Label
            {
                AutoSize = true,
                Text = text
            };
            PictureBox box = new PictureBox
            {
                BorderStyle = BorderStyle.None,
                Size = new Size(16, 16)
            };
            bool isOK = dep.Check(addInDict, out Version versionFound);
            box.SizeMode = PictureBoxSizeMode.CenterImage;
            box.Image = isOK ? WinFormsResourceService.GetBitmap("Icons.16x16.OK") : WinFormsResourceService.GetBitmap("Icons.16x16.DeleteIcon");
            dependencyTable.Controls.Add(label, 1, rowIndex);
            dependencyTable.Controls.Add(box, 0, rowIndex);
            return isOK;
        }

        void AddLabelRow(int rowIndex, string text)
        {
            Label label = new Label
            {
                AutoSize = true,
                Text = text
            };
            dependencyTable.Controls.Add(label, 0, rowIndex);
            dependencyTable.SetColumnSpan(label, 2);
        }
        void UpdateActionBox()
        {
            ignoreFocusChange = true;
            selected = new List<AddIn>();
            foreach (AddInControl ctl in splitContainer.Panel1.Controls)
                if (ctl.Selected)
                    selected.Add(ctl.AddIn);

            splitContainer.Panel2Collapsed = selected.Count == 0;
            if (selected.Count > 0)
            {
                dependencyTable.Visible = false;
                runActionButton.Visible = true;
                uninstallButton.Visible = true;

                bool allHaveIdentity = true;
                bool allEnabled = true;
                bool allDisabled = true;
                bool allInstalling = true;
                bool allUninstalling = true;
                bool allUpdating = true;
                bool allUninstallable = true;
                bool hasErrors = false;
                foreach (AddIn addIn in selected)
                {
                    if (addIn.Manifest.PrimaryIdentity == null)
                    {
                        allHaveIdentity = false;
                        break;
                    }
                    allEnabled &= addIn.Action == AddInAction.Enable;
                    if (IsErrorAction(addIn.Action))
                        hasErrors = true;
                    else
                        allDisabled &= addIn.Action == AddInAction.Disable;
                    allUpdating &= addIn.Action == AddInAction.Update;
                    allInstalling &= addIn.Action == AddInAction.Install;
                    allUninstalling &= addIn.Action == AddInAction.Uninstall;
                    if (allUninstallable && IsInstalledInApplicationRoot(addIn))
                        allUninstallable = false;
                }
                if (allEnabled == true || allHaveIdentity == false)
                {
                    selectedAction = AddInAction.Disable;
                    actionGroupBox.Text = runActionButton.Text = GResources.GetResourceText(29450550);
                    actionDescription.Text = GResources.GetResourceText(29450551);
                    if (allHaveIdentity)
                        runActionButton.Enabled = ShowDependencies(selected, ShowDependencyMode.Disable);
                    else
                        runActionButton.Enabled = false;
                    uninstallButton.Enabled = allUninstallable;
                }
                else if (allDisabled)
                {
                    selectedAction = AddInAction.Enable;
                    actionGroupBox.Text = runActionButton.Text = GResources.GetResourceText(29450552);
                    actionDescription.Text = GResources.GetResourceText(29450553);
                    runActionButton.Enabled = ShowDependencies(selected, ShowDependencyMode.Enable);
                    if (hasErrors)
                        runActionButton.Enabled = false;
                    uninstallButton.Enabled = allUninstallable;
                }
                else if (allInstalling)
                {
                    selectedAction = AddInAction.Uninstall;
                    actionGroupBox.Text = runActionButton.Text = GResources.GetResourceText(29450554);
                    actionDescription.Text = GResources.GetResourceText(29450555);
                    runActionButton.Enabled = ShowDependencies(selected, ShowDependencyMode.Disable);
                    uninstallButton.Visible = false;
                }
                else if (allUninstalling)
                {
                    selectedAction = AddInAction.Enable;
                    actionGroupBox.Text = runActionButton.Text = GResources.GetResourceText(29450556);
                    actionDescription.Text = GResources.GetResourceText(29450557);
                    runActionButton.Enabled = ShowDependencies(selected, ShowDependencyMode.Enable);
                    uninstallButton.Visible = false;
                }
                else if (allUpdating)
                {
                    selectedAction = AddInAction.InstalledTwice;
                    actionGroupBox.Text = runActionButton.Text = GResources.GetResourceText(29450558);
                    actionDescription.Text = GResources.GetResourceText(29450559);
                    runActionButton.Enabled = ShowDependencies(selected, ShowDependencyMode.CancelUpdate);
                    uninstallButton.Visible = false;
                }
                else
                {
                    actionGroupBox.Text = "";
                    actionDescription.Text = GResources.GetResourceText(29450560);
                    runActionButton.Visible = false;
                    uninstallButton.Visible = false;
                }
            }
            ignoreFocusChange = false;
        }

        string GetDisplayName(string identity)
        {
            foreach (AddIn addIn in AddInTree.AddIns)
                if (addIn.Manifest.Identities.ContainsKey(identity))
                    return addIn.Name;

            return identity;
        }
        #endregion

        #region Instalace nových doplòkù
        IList<InstallableAddIn> shownAddInPackages;

        /// <summary>
        /// zobrazení instalovatelných doplòkù
        /// </summary>
        /// <param name="fileNames">názvy souborù doplòkù</param>
        /// <returns>TRUE - vše probìhlo hladce</returns>
        public bool ShowInstallableAddIns(IEnumerable<string> fileNames)
        {
            foreach (AddInControl ctl in splitContainer.Panel1.Controls)
                ctl.Selected = false;

            UpdateActionBox();
            List<InstallableAddIn> list = new List<InstallableAddIn>();
            foreach (string file in fileNames)
            {
                try
                {
                    // Same file-extension check is in Panel1DragEnter
                    switch (Path.GetExtension(file).ToLowerInvariant())
                    {
                        case ".addin":
                            if (FileUtility.IsBaseDirectory(FileUtility.ApplicationRootPath, file))
                            {
                                MessageService.ShowMessage(GResources.GetResourceText(29450561));
                                return false;
                            }
                            list.Add(new InstallableAddIn(file, false));
                            break;
                        case ".sdaddin":
                        case ".zip":
                            list.Add(new InstallableAddIn(file, true));
                            break;
                        default:
                            MessageService.ShowMessage(GResources.GetResourceText(29450562) + ": " + Path.GetExtension(file) + "\r\n" + GResources.GetResourceText(29450563));
                            return false;
                    }
                }
                catch (AddInLoadException ex)
                {
                    MessageService.ShowMessage(GResources.GetResourceText(29450239) + " " + file + ":\n" + ex.Message);
                    return false;
                }
            }

            ShowInstallableAddIns(list);
            return true;
        }

        void ShowInstallableAddIns(IList<InstallableAddIn> addInPackages)
        {
            shownAddInPackages = addInPackages;
            ignoreFocusChange = true;
            splitContainer.Panel2Collapsed = false;
            dependencyTable.Visible = false;
            runActionButton.Visible = true;
            uninstallButton.Visible = false;

            selectedAction = AddInAction.Install;
            List<string> installAddIns = new List<string>();
            List<string> updateAddIns = new List<string>();
            foreach (InstallableAddIn addInPackage in addInPackages)
            {
                string identity = addInPackage.AddIn.Manifest.PrimaryIdentity;
                AddIn foundAddIn = null;
                foreach (AddIn addIn in AddInTree.AddIns)
                    if (addIn.Action != AddInAction.Install
                        && addIn.Manifest.Identities.ContainsKey(identity))
                    {
                        foundAddIn = addIn;
                        break;
                    }

                if (foundAddIn != null)
                    updateAddIns.Add(addInPackage.AddIn.Name);
                else
                    installAddIns.Add(addInPackage.AddIn.Name);
            }

            if (updateAddIns.Count == 0)
                actionGroupBox.Text = runActionButton.Text = GResources.GetResourceText(29450564);
            else if (installAddIns.Count == 0)
                actionGroupBox.Text = runActionButton.Text = GResources.GetResourceText(29450565);
            else
                actionGroupBox.Text = runActionButton.Text = GResources.GetResourceText(29450564) + " + " + GResources.GetResourceText(29450565);

            List<AddIn> addInList = new List<AddIn>();
            StringBuilder b = new StringBuilder();
            if (installAddIns.Count == 1)
                b.Append(GResources.GetResourceText(29450566) + " " + installAddIns[0]);
            else if (installAddIns.Count > 1)
                b.Append(GResources.GetResourceText(29450567) + " " + string.Join(",", installAddIns.ToArray()));
            if (updateAddIns.Count > 0 && installAddIns.Count > 0)
                b.Append("; ");
            if (updateAddIns.Count == 1)
                b.Append(GResources.GetResourceText(29450568) + " " + updateAddIns[0]);
            else if (updateAddIns.Count > 1)
                b.Append(GResources.GetResourceText(29450569) + " " + string.Join(",", updateAddIns.ToArray()));
            actionDescription.Text = b.ToString();
            runActionButton.Enabled = ShowDependencies(addInList, ShowDependencyMode.Enable);
        }
        void InstallButtonClick(object sender, EventArgs e)
        {
            using (OpenFileDialog dlg = new OpenFileDialog())
            {
                dlg.Filter = GResources.GetResourceText(29450570) + "|*.addin;*.sdaddin|" + GResources.GetResourceText(29450571) + "|*.*";
                dlg.Multiselect = true;

                if (dlg.ShowDialog() == DialogResult.OK)
                    if (ShowInstallableAddIns(dlg.FileNames))
                        if (runActionButton.Visible && runActionButton.Enabled)
                            runActionButton.PerformClick();
            }
        }
        void RunInstallation()
        {
            // instalace nových doplòkù
            foreach (InstallableAddIn addInPackage in shownAddInPackages)
            {
                string identity = addInPackage.AddIn.Manifest.PrimaryIdentity;
                AddIn foundAddIn = null;
                foreach (AddIn addIn in AddInTree.AddIns)
                    if (addIn.Manifest.Identities.ContainsKey(identity))
                    {
                        foundAddIn = addIn;
                        break;
                    }

                if (foundAddIn != null)
                {
                    addInPackage.Install(true);
                    if (foundAddIn.Action != AddInAction.Enable)
                        Core.AddInManager.Enable(new AddIn[] { foundAddIn });
                    if (foundAddIn.Action != AddInAction.Install)
                        foundAddIn.Action = AddInAction.Update;
                }
                else
                    addInPackage.Install(false);
            }
            RefreshAddInList();
        }
        #endregion

        #region Deinstalace doplòku
        void UninstallButtonClick(object sender, EventArgs e)
        {
            for (int i = 0; i < selected.Count; i++)
                if (selected[i].Manifest.PrimaryIdentity != null
                    && selected[i].Manifest.PrimaryIdentity.Equals("Gordic.GFE.Parsers.AddInManager", StringComparison.OrdinalIgnoreCase))
                {
                    MessageService.ShowMessage(GResources.GetResourceText(29450572));
                    selected.RemoveAt(i--);
                }

            if (selected.Count != 0)
            {
                Core.AddInManager.RemoveExternalAddIns(selected);
                InstallableAddIn.Uninstall(selected);
                RefreshAddInList();
            }
        }
        #endregion

        #region Drag'N'Drop
        void Panel1DragEnter(object sender, DragEventArgs e)
        {
            if (!e.Data.GetDataPresent(DataFormats.FileDrop))
            {
                e.Effect = DragDropEffects.None;
                return;
            }
            string[] files = (string[])e.Data.GetData(DataFormats.FileDrop);
            int addInCount = 0;
            int packageCount = 0;
            foreach (string file in files)
            {
                switch (Path.GetExtension(file).ToLowerInvariant())
                {
                    case ".addin":
                        addInCount += 1;
                        break;
                    case ".sdaddin":
                    case ".zip":
                        packageCount += 1;
                        break;
                    default:
                        e.Effect = DragDropEffects.None;
                        return;
                }
            }
            if (addInCount == 0 && packageCount == 0)
                e.Effect = DragDropEffects.None;
            else if (addInCount == 0)
                e.Effect = DragDropEffects.Copy;
            else
                e.Effect = DragDropEffects.Link;
        }
        void Panel1DragDrop(object sender, DragEventArgs e)
        {
            if (!e.Data.GetDataPresent(DataFormats.FileDrop))
                return;
            ShowInstallableAddIns((string[])e.Data.GetData(DataFormats.FileDrop));
        }
        #endregion

        /// <exclude/>
        protected override void OnClosed(EventArgs e)
        {
            base.OnClosed(e);
            instance = null;
        }

        /// <summary>
        /// pokus o spuštìní akce doplòku
        /// </summary>
        /// <param name="addIn">doplnìk</param>
        /// <param name="action">akce ke spuštìní</param>
        public void TryRunAction(AddIn addIn, AddInAction action)
        {
            foreach (AddInControl ctl in splitContainer.Panel1.Controls)
                ctl.Selected = ctl.AddIn == addIn;
            UpdateActionBox();
            if (selectedAction == action && runActionButton.Visible && runActionButton.Enabled)
                runActionButton.PerformClick();
        }
        /// <summary>
        /// pokus o deinstalací doplòku
        /// </summary>
        /// <param name="addIn">doplnìk k deinstalaci</param>
        public void TryUninstall(AddIn addIn)
        {
            foreach (AddInControl ctl in splitContainer.Panel1.Controls)
                ctl.Selected = ctl.AddIn == addIn;
            UpdateActionBox();
            if (uninstallButton.Visible && uninstallButton.Enabled)
                uninstallButton.PerformClick();
        }

        void CloseButtonClick(object sender, EventArgs e) { Close(); }
        void RunActionButtonClick(object sender, EventArgs e)
        {
            switch (selectedAction)
            {
                case AddInAction.Disable:
                    for (int i = 0; i < selected.Count; i++)
                        if (selected[i].Manifest.PrimaryIdentity != null
                            && selected[i].Manifest.PrimaryIdentity.Equals("Gordic.GFE.Parsers.AddInManager", StringComparison.OrdinalIgnoreCase))
                        {
                            MessageService.ShowMessage(GResources.GetResourceText(29450573));
                            selected.RemoveAt(i--);
                        }

                    Core.AddInManager.Disable(selected);
                    break;
                case AddInAction.Enable:
                    Core.AddInManager.Enable(selected);
                    break;
                case AddInAction.Install:
                    RunInstallation();
                    return;
                case AddInAction.Uninstall:
                    UninstallButtonClick(sender, e);
                    return;
                case AddInAction.InstalledTwice: // používá se pro zrušení instalace aktualizace
                    InstallableAddIn.CancelUpdate(selected);
                    foreach (AddIn addIn in selected)
                        addIn.Action = addIn.Enabled ? AddInAction.Enable : AddInAction.Disable;
                    break;
                default:
                    throw new NotImplementedException();
            }
            foreach (AddInControl ctl in splitContainer.Panel1.Controls)
                ctl.Invalidate();
            UpdateActionBox();
        }

        #region Windows Forms Designer generated code
        /// <summary>
        /// This method is required for Windows Forms designer support.
        /// Do not change the method contents inside the source code editor. The Forms designer might
        /// not be able to load this method if it was changed manually.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ManagerForm));
            this.topPanel = new System.Windows.Forms.Panel();
            this.bottomPanel = new System.Windows.Forms.Panel();
            this.installButton = new System.Windows.Forms.Button();
            this.closeButton = new System.Windows.Forms.Button();
            this.showPreinstalledAddInsCheckBox = new System.Windows.Forms.CheckBox();
            this.splitContainer = new System.Windows.Forms.SplitContainer();
            this.actionGroupBox = new System.Windows.Forms.GroupBox();
            this.actionFlowLayoutPanel = new System.Windows.Forms.FlowLayoutPanel();
            this.actionDescription = new System.Windows.Forms.Label();
            this.dependencyTable = new System.Windows.Forms.TableLayoutPanel();
            this.dummyLabel1 = new System.Windows.Forms.Label();
            this.dummyLabel2 = new System.Windows.Forms.Label();
            this.runActionButton = new System.Windows.Forms.Button();
            this.uninstallButton = new System.Windows.Forms.Button();
            this.bottomPanel.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer)).BeginInit();
            this.splitContainer.Panel2.SuspendLayout();
            this.splitContainer.SuspendLayout();
            this.actionGroupBox.SuspendLayout();
            this.actionFlowLayoutPanel.SuspendLayout();
            this.dependencyTable.SuspendLayout();
            this.SuspendLayout();
            // 
            // topPanel
            // 
            resources.ApplyResources(this.topPanel, "topPanel");
            this.topPanel.Name = "topPanel";
            // 
            // bottomPanel
            // 
            this.bottomPanel.Controls.Add(this.installButton);
            this.bottomPanel.Controls.Add(this.closeButton);
            this.bottomPanel.Controls.Add(this.showPreinstalledAddInsCheckBox);
            resources.ApplyResources(this.bottomPanel, "bottomPanel");
            this.bottomPanel.Name = "bottomPanel";
            // 
            // installButton
            // 
            resources.ApplyResources(this.installButton, "installButton");
            this.installButton.Name = "installButton";
            this.installButton.UseCompatibleTextRendering = true;
            this.installButton.UseVisualStyleBackColor = true;
            this.installButton.Click += new System.EventHandler(this.InstallButtonClick);
            // 
            // closeButton
            // 
            resources.ApplyResources(this.closeButton, "closeButton");
            this.closeButton.Name = "closeButton";
            this.closeButton.UseCompatibleTextRendering = true;
            this.closeButton.UseVisualStyleBackColor = true;
            this.closeButton.Click += new System.EventHandler(this.CloseButtonClick);
            // 
            // showPreinstalledAddInsCheckBox
            // 
            resources.ApplyResources(this.showPreinstalledAddInsCheckBox, "showPreinstalledAddInsCheckBox");
            this.showPreinstalledAddInsCheckBox.Name = "showPreinstalledAddInsCheckBox";
            this.showPreinstalledAddInsCheckBox.UseCompatibleTextRendering = true;
            this.showPreinstalledAddInsCheckBox.UseVisualStyleBackColor = true;
            this.showPreinstalledAddInsCheckBox.CheckedChanged += new System.EventHandler(this.ShowPreinstalledAddInsCheckBoxCheckedChanged);
            // 
            // splitContainer
            // 
            this.splitContainer.BackColor = System.Drawing.SystemColors.Window;
            resources.ApplyResources(this.splitContainer, "splitContainer");
            this.splitContainer.FixedPanel = System.Windows.Forms.FixedPanel.Panel2;
            this.splitContainer.Name = "splitContainer";
            // 
            // splitContainer.Panel1
            // 
            this.splitContainer.Panel1.AllowDrop = true;
            resources.ApplyResources(this.splitContainer.Panel1, "splitContainer.Panel1");
            this.splitContainer.Panel1.DragDrop += new System.Windows.Forms.DragEventHandler(this.Panel1DragDrop);
            this.splitContainer.Panel1.DragEnter += new System.Windows.Forms.DragEventHandler(this.Panel1DragEnter);
            this.splitContainer.Panel1.Paint += new System.Windows.Forms.PaintEventHandler(this.OnSplitContainerPanel1Paint);
            // 
            // splitContainer.Panel2
            // 
            this.splitContainer.Panel2.Controls.Add(this.actionGroupBox);
            // 
            // actionGroupBox
            // 
            this.actionGroupBox.Controls.Add(this.actionFlowLayoutPanel);
            resources.ApplyResources(this.actionGroupBox, "actionGroupBox");
            this.actionGroupBox.Name = "actionGroupBox";
            this.actionGroupBox.TabStop = false;
            this.actionGroupBox.UseCompatibleTextRendering = true;
            // 
            // actionFlowLayoutPanel
            // 
            resources.ApplyResources(this.actionFlowLayoutPanel, "actionFlowLayoutPanel");
            this.actionFlowLayoutPanel.Controls.Add(this.actionDescription);
            this.actionFlowLayoutPanel.Controls.Add(this.dependencyTable);
            this.actionFlowLayoutPanel.Controls.Add(this.runActionButton);
            this.actionFlowLayoutPanel.Controls.Add(this.uninstallButton);
            this.actionFlowLayoutPanel.ForeColor = System.Drawing.SystemColors.WindowText;
            this.actionFlowLayoutPanel.Name = "actionFlowLayoutPanel";
            // 
            // actionDescription
            // 
            resources.ApplyResources(this.actionDescription, "actionDescription");
            this.actionDescription.Name = "actionDescription";
            this.actionDescription.UseCompatibleTextRendering = true;
            // 
            // dependencyTable
            // 
            resources.ApplyResources(this.dependencyTable, "dependencyTable");
            this.dependencyTable.Controls.Add(this.dummyLabel1, 1, 0);
            this.dependencyTable.Controls.Add(this.dummyLabel2, 1, 1);
            this.dependencyTable.Name = "dependencyTable";
            // 
            // dummyLabel1
            // 
            resources.ApplyResources(this.dummyLabel1, "dummyLabel1");
            this.dummyLabel1.Name = "dummyLabel1";
            this.dummyLabel1.UseCompatibleTextRendering = true;
            // 
            // dummyLabel2
            // 
            resources.ApplyResources(this.dummyLabel2, "dummyLabel2");
            this.dummyLabel2.Name = "dummyLabel2";
            this.dummyLabel2.UseCompatibleTextRendering = true;
            // 
            // runActionButton
            // 
            resources.ApplyResources(this.runActionButton, "runActionButton");
            this.runActionButton.Name = "runActionButton";
            this.runActionButton.UseCompatibleTextRendering = true;
            this.runActionButton.UseVisualStyleBackColor = true;
            this.runActionButton.Click += new System.EventHandler(this.RunActionButtonClick);
            // 
            // uninstallButton
            // 
            resources.ApplyResources(this.uninstallButton, "uninstallButton");
            this.uninstallButton.Name = "uninstallButton";
            this.uninstallButton.UseCompatibleTextRendering = true;
            this.uninstallButton.UseVisualStyleBackColor = true;
            this.uninstallButton.Click += new System.EventHandler(this.UninstallButtonClick);
            // 
            // ManagerForm
            // 
            resources.ApplyResources(this, "$this");
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.splitContainer);
            this.Controls.Add(this.bottomPanel);
            this.Controls.Add(this.topPanel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.SizableToolWindow;
            this.Name = "ManagerForm";
            this.bottomPanel.ResumeLayout(false);
            this.splitContainer.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer)).EndInit();
            this.splitContainer.ResumeLayout(false);
            this.actionGroupBox.ResumeLayout(false);
            this.actionFlowLayoutPanel.ResumeLayout(false);
            this.actionFlowLayoutPanel.PerformLayout();
            this.dependencyTable.ResumeLayout(false);
            this.dependencyTable.PerformLayout();
            this.ResumeLayout(false);

        }
        private System.Windows.Forms.Label dummyLabel2;
        private System.Windows.Forms.Label dummyLabel1;
        private System.Windows.Forms.CheckBox showPreinstalledAddInsCheckBox;
        private System.Windows.Forms.Button installButton;
        private System.Windows.Forms.Button uninstallButton;
        private System.Windows.Forms.Button runActionButton;
        private System.Windows.Forms.TableLayoutPanel dependencyTable;
        private System.Windows.Forms.Label actionDescription;
        private System.Windows.Forms.FlowLayoutPanel actionFlowLayoutPanel;
        private System.Windows.Forms.GroupBox actionGroupBox;
        private System.Windows.Forms.Button closeButton;
        private System.Windows.Forms.SplitContainer splitContainer;
        private System.Windows.Forms.Panel bottomPanel;
        private System.Windows.Forms.Panel topPanel;
        #endregion
    }
}
