//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.NewFileDialog.cs                         </Name>
//    <Description> Třída pro vytvoření nového prázdného souboru                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.AddIns;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.XmlForms;
using Gordic.GFE.WinClient.DefaultEditor;
using Gordic.GFE.WinClient.Internal.Templates;
using Gordic.General;
using Gordic.GFE.WinClient.Project;

namespace Gordic.GFE.WinClient.Gui
{
    /// <summary>
    ///  Třída pro vytvoření nového prázdného souboru
    /// </summary>
    class NewFileDialog : BaseXmlForm
    {
        /// <summary>
        ///  Kategorie souborů
        /// </summary>
        public class Category : TreeNode, ICategory
        {
            /// <summary>
            /// Indikuje výběr
            /// </summary>
            public bool Selected = false;
            /// <summary>
            /// Indikuje výběr šablony
            /// </summary>
            public bool HasSelectedTemplate = false;
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="name">název</param>
            /// <param name="sortOrder">pořadí</param>
            public Category(string name, int sortOrder)
                : base(StringParser.Parse(name))
            {
                this.Name = StringParser.Parse(name);
                ImageIndex = 1;
                this.SortOrder = sortOrder;
            }
            /// <summary>
            /// Vytvoření nové instance třídy
            /// </summary>
            /// <param name="name">název</param>
            public Category(string name)
                : this(name, TemplateCategorySortOrderFile.UndefinedSortOrder)
            {
            }
            /// <summary>
            /// Kategorie
            /// </summary>
            public ArrayList Categories { get; } = new ArrayList();
            /// <summary>
            /// šablony
            /// </summary>
            public ArrayList Templates { get; } = new ArrayList();

            /// <summary>
            /// řazení
            /// </summary>
            public int SortOrder { get; set; }
        }

        /// <summary>
        ///  Represents a new file template
        /// </summary>
        class TemplateItem : ListViewItem
        {
            /// <summary>
            /// šablona souboru
            /// </summary>
            public FileTemplate Template { get; }

            /// <summary>
            /// položka šablony
            /// </summary>
            /// <param name="template"></param>
            public TemplateItem(FileTemplate template)
                : base(StringParser.Parse(template.Name))
            {
                this.Template = template;
                ImageIndex = 0;
            }
        }

        readonly PropertyGrid propertyGrid = new PropertyGrid();

        ListView templateListView;
        TreeView categoryTreeView;

        ArrayList alltemplates = new ArrayList(), categories = new ArrayList();
        Hashtable icons = new Hashtable();
        readonly bool allowUntitledFiles;
        bool isNameModified = false;
        readonly string basePath;

        /// <summary>
        /// VYtvořené soubory
        /// </summary>
        public List<KeyValuePair<string, FileDescriptionTemplate>> CreatedFiles { get; } = new List<KeyValuePair<string, FileDescriptionTemplate>>();

        FileTemplate SelectedTemplate
        {
            get
            {
                return templateListView.SelectedItems.Count == 1 ? ((TemplateItem)templateListView.SelectedItems[0]).Template : null;
            }
        }

        bool AllPropertiesHaveAValue
        {
            get
            {
                foreach (TemplateProperty property in SelectedTemplate.Properties)
                {
                    string val = StringParser.Properties["Properties." + property.Name];
                    if (val == null || val.Length == 0)
                        return false;
                }
                return true;
            }
        }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="bPath">základní cesta</param>
        public NewFileDialog(string bPath)
        {
            StandardHeader.SetHeaders();
            InfoSection.SetSections();
            TemplateSection.SetSections();
            this.basePath = bPath;
            this.allowUntitledFiles = bPath == null;
            try
            {
                InitializeComponents();
                InitializeTemplates();
                InitializeView();

                if (allowUntitledFiles)
                    categoryTreeView.Select();
                else
                    ControlDictionary["fileNameTextBox"].Select();
            }
            catch (Exception e) { MessageService.ShowError(e); }
        }

        /// <summary>
        /// Kontrola dostupnosti jména souboru
        /// </summary>
        /// <param name="fileName">název souboru</param>
        /// <returns></returns>
        public static bool IsFilenameAvailable(string fileName)
        {
            return Path.IsPathRooted(fileName) ? !File.Exists(fileName) : true;
        }

        /// <summary>
        /// Uložení souboru
        /// </summary>
        /// <param name="newfile"></param>
        /// <param name="content"></param>
        /// <param name="binaryContent"></param>
        public void SaveFile(FileDescriptionTemplate newfile, string content, byte[] binaryContent = null)
        {
            string parsedFileName = StringParser.Parse(newfile.Name)
            , structureParams = StringParser.Parse(content).Replace("Structure_Parameters=\"${Structure_Parameters}\"", "${Structure_Parameters}")
            , parsedContent = structureParams.Contains("${Structure_Parameters}") ? StringParser.Parse(StringParser.Parse(structureParams)) : StringParser.Parse(structureParams);
            if (parsedContent != null && !string.IsNullOrEmpty(parsedContent))
            {
                parsedContent = parsedContent.Replace("&lt;", "<").Replace("&gt;", ">");
                if (parsedContent.Contains("${Structure_Parameters}"))
                    parsedContent = parsedContent.Replace("${Structure_Parameters}", string.Empty);
                if (parsedContent != null && ReportDesignerTextEditorProperties.Instance.IndentationString != "\t")
                    parsedContent = parsedContent.Replace("\t", ReportDesignerTextEditorProperties.Instance.IndentationString);
            }

            if (parsedFileName.StartsWith("/") && !parsedFileName.StartsWith("//")
                || parsedFileName.StartsWith("\\") && !parsedFileName.StartsWith("\\\\"))
                parsedFileName = parsedFileName.Substring(1);


            if (binaryContent != null)
            {
                LoggingService.Warning(GResources.GetResourceText(29450494)); //RC 29450494 : Binární soubor byl přeskočen
                return;
            }
            IViewContent viewContent = Services.FileAgent.NewFile(Path.GetFileName(parsedFileName), parsedContent);
            if (viewContent != null)
            {
                bool projectOpened = false;
                if (newfile.FileType == FileType.project)
                {
                    SaveFileDialog sfd = new SaveFileDialog
                    {
                        Filter = GResources.GetResourceText(29451512),
                        FileName = parsedFileName
                    };
                    if (sfd.ShowDialog() == DialogResult.OK)
                    {
                        viewContent.PrimaryFile.SaveToDisk(sfd.FileName);
                        ProjectService.LoadSolutionOrProject(sfd.FileName);
                        projectOpened = true;
                    }
                }

                if (!projectOpened)
                {
                    DisplayBindingService.AttachSubWindows(viewContent, false);
                    SimpleDesktop.Desktop.ShowView(viewContent);

                    if (Path.IsPathRooted(parsedFileName))
                    {
                        Directory.CreateDirectory(Path.GetDirectoryName(parsedFileName));
                        viewContent.PrimaryFile.SaveToDisk(parsedFileName);
                    }
                    CreatedFiles.Add(new KeyValuePair<string, FileDescriptionTemplate>(parsedFileName, newfile));
                }
            }
        }
        /// <summary>
        /// Vytvoření sestavy dle šablony
        /// </summary>
        /// <param name="fileTemplate">šablona sestavy</param>
        public void CreateEvent(FileTemplate fileTemplate)
        {
            string fileName = GenerateCurrentFileName(fileTemplate);

            StringParser.Properties["FullName"] = fileName;
            StringParser.Properties["FileName"] = Path.GetFileName(fileName);
            StringParser.Properties["FileNameWithoutExtension"] = Path.GetFileNameWithoutExtension(fileName);
            StringParser.Properties["Extension"] = Path.GetExtension(fileName);
            StringParser.Properties["Path"] = Path.GetDirectoryName(fileName);
            //DataService.UpdateInfoSection();

            if (fileTemplate.WizardPath != null)
            {
                Property customizer = new Property();
                customizer.Set("Template", fileTemplate);
                customizer.Set("Creator", this);
                WizardDialog wizard = new WizardDialog(GResources.GetResourceText(29450495), customizer, fileTemplate.WizardPath); //RC 29450495 : Průvodce vytvoření souboru
                wizard.ShowDialog(SimpleDesktop.MainForm);
            }
            else
            {
                foreach (FileDescriptionTemplate newfile in fileTemplate.FileDescriptionTemplates)
                    if (!IsFilenameAvailable(StringParser.Parse(newfile.Name)))
                    {
                        MessageService.ShowError(string.Format(string.Join(" ", GResources.GetResourceText(29450498), "{0}", GResources.GetResourceText(29450497) + '\n' + GResources.GetResourceText(29450496)), StringParser.Parse(newfile.Name))); //RC 29450498 : Název souboru
                        return;
                    }

                foreach (FileDescriptionTemplate newfile in fileTemplate.FileDescriptionTemplates)
                    SaveFile(newfile, newfile.ContentData != null ? null : newfile.Content, newfile.ContentData);

                foreach (KeyValuePair<string, FileDescriptionTemplate> entry in CreatedFiles)
                    Parsers.Services.FileService.FireFileCreated(entry.Key, false);
            }

        }

        Category GetCategory(string categoryname, string subcategoryname)
        {
            foreach (Category category in categories)
                if (category.Name.Equals(categoryname))
                    return subcategoryname == null ? category : GetSubcategory(category, subcategoryname);
            Category newcategory = new Category(categoryname, TemplateCategorySortOrderFile.GetFileCategorySortOrder(categoryname));
            categories.Add(newcategory);
            return subcategoryname != null ? GetSubcategory(newcategory, subcategoryname) : newcategory;
        }
        Category GetSubcategory(Category parentCategory, string name)
        {
            foreach (Category subcategory in parentCategory.Categories)
                if (subcategory.Name.Equals(name))
                    return subcategory;
            Category newsubcategory = new Category(name, TemplateCategorySortOrderFile.GetFileCategorySortOrder(parentCategory.Name, name));
            parentCategory.Categories.Add(newsubcategory);
            return newsubcategory;
        }

        string GenerateCurrentFileName()
        {
            return GenerateCurrentFileName(SelectedTemplate);
        }
        string GenerateCurrentFileName(FileTemplate fileTemplate)
        {
            if (fileTemplate.DefaultName.IndexOf("${Number}") >= 0)
                try
                {
                    int curNumber = 1;

                    while (true)
                    {
                        StringParser.Properties["Number"] = curNumber.ToString();
                        string fileName = StringParser.Parse(fileTemplate.DefaultName);
                        if (allowUntitledFiles)
                        {
                            bool found = false;
                            foreach (string openFile in Gordic.GFE.WinClient.Services.FileAgent.GetOpenFiles())
                                if (Path.GetFileName(openFile) == fileName)
                                {
                                    found = true;
                                    break;
                                }
                            if (!found)
                                break;
                        }
                        else if (!File.Exists(Path.Combine(basePath, fileName)))
                            break;
                        ++curNumber;
                    }
                }
                catch (Exception e) { MessageService.ShowError(e); }
            return StringParser.Parse(fileTemplate.DefaultName);
        }

        void InsertCategories(TreeNode node, ArrayList catarray)
        {
            foreach (Category cat in catarray)
            {
                if (node == null)
                    categoryTreeView.Nodes.Add(cat);
                else
                    node.Nodes.Add(cat);
                InsertCategories(cat, cat.Categories);
            }
        }
        void InitializeView()
        {
            ImageList smalllist = new ImageList();
            ImageList imglist = new ImageList();
            smalllist.ColorDepth = ColorDepth.Depth32Bit;
            imglist.ColorDepth = ColorDepth.Depth32Bit;

            imglist.ImageSize = new Size(32, 32);
            smalllist.ImageSize = new Size(16, 16);

            smalllist.Images.Add(IconService.GetBitmap("Icons.32x32.EmptyFileIcon"));
            imglist.Images.Add(IconService.GetBitmap("Icons.32x32.EmptyFileIcon"));

            int i = 0;
            Hashtable tmp = new Hashtable(icons);

            foreach (DictionaryEntry entry in icons)
            {
                Bitmap bitmap = IconService.GetBitmap(entry.Key.ToString());
                if (bitmap != null)
                {
                    smalllist.Images.Add(bitmap);
                    imglist.Images.Add(bitmap);
                    tmp[entry.Key] = ++i;
                }
            }

            icons = tmp;
            foreach (TemplateItem item in alltemplates)
                item.ImageIndex = string.IsNullOrEmpty(item.Template.Icon) ? 0 : (int)icons[item.Template.Icon];

            templateListView.LargeImageList = imglist;
            templateListView.SmallImageList = smalllist;

            InsertCategories(null, categories);

            categoryTreeView.TreeViewNodeSorter = new TemplateCategoryComparer();
            categoryTreeView.Sort();

            TreeViewHelper.ApplyViewStateString(PropertyService.Get("Dialogs.NewFileDialog.CategoryViewState", ""), categoryTreeView);

            categoryTreeView.SelectedNode = TreeViewHelper.GetNodeByPath(categoryTreeView, PropertyService.Get("Dialogs.NewFileDialog.LastSelectedCategory", GResources.GetResourceText(29451513)));
        }
        void InitializeTemplates()
        {
            foreach (FileTemplate template in FileTemplate.FileTemplates)
            {
                TemplateItem titem = new TemplateItem(template);
                if (!string.IsNullOrEmpty(titem.Template.Icon))
                    icons[titem.Template.Icon] = 0; // "vytvoření ikonky šablony"
                if (template.NewFileDialogVisible == true)
                {
                    Category cat = GetCategory(StringParser.Parse(titem.Template.Category), StringParser.Parse(titem.Template.Subcategory));
                    cat.Templates.Add(titem);

                    if (cat.Selected == false && template.WizardPath == null)
                        cat.Selected = true;
                    if (!cat.HasSelectedTemplate && titem.Template.FileDescriptionTemplates.Count == 1)
                        if (((FileDescriptionTemplate)titem.Template.FileDescriptionTemplates[0]).Name.StartsWith("Empty"))
                        {
                            titem.Selected = true;
                            cat.HasSelectedTemplate = true;
                        }
                }
                alltemplates.Add(titem);
            }
        }
        void CategoryChange(object sender, TreeViewEventArgs e)
        {
            templateListView.Items.Clear();
            if (categoryTreeView.SelectedNode != null)
                foreach (TemplateItem item in ((Category)categoryTreeView.SelectedNode).Templates)
                    templateListView.Items.Add(item);

            string activeTemplate = PropertyService.Get("Dialogs.NewFileDialog.LastSelectedTemplate", "");
            foreach (TemplateItem item in templateListView.Items)
                if (item.Template.Name == activeTemplate)
                    item.Selected = true;
        }
        void OnBeforeExpand(object sender, TreeViewCancelEventArgs e)
        {
            e.Node.ImageIndex = 1;
        }
        void OnBeforeCollapse(object sender, TreeViewCancelEventArgs e)
        {
            e.Node.ImageIndex = 0;
        }
        void SelectedIndexChange(object sender, EventArgs e)
        {
            if (templateListView.SelectedItems.Count == 1)
            {
                ControlDictionary["descriptionLabel"].Text = StringParser.Parse(SelectedTemplate.Description);
                ControlDictionary["openButton"].Enabled = true;
                if (!this.allowUntitledFiles && !isNameModified)
                {
                    ControlDictionary["fileNameTextBox"].Text = GenerateCurrentFileName();
                    isNameModified = false;
                }
            }
            else
            {
                ControlDictionary["descriptionLabel"].Text = String.Empty;
                ControlDictionary["openButton"].Enabled = false;
            }
        }
        void FileNameChanged(object sender, EventArgs e)
        {
            isNameModified = true;
        }
        void CheckedChange(object sender, EventArgs e)
        {
            templateListView.View = ((RadioButton)ControlDictionary["smallIconsRadioButton"]).Checked ? View.List : View.LargeIcon;
        }
        void OpenEvent(object sender, EventArgs e)
        {
            if (categoryTreeView.SelectedNode != null)
            {
                PropertyService.Set("Dialogs.NewProjectDialog.LargeImages", ((RadioButton)ControlDictionary["largeIconsRadioButton"]).Checked);
                PropertyService.Set("Dialogs.NewFileDialog.CategoryViewState", TreeViewHelper.GetViewStateString(categoryTreeView));
                PropertyService.Set("Dialogs.NewFileDialog.LastSelectedCategory", TreeViewHelper.GetPath(categoryTreeView.SelectedNode));
            }
            CreatedFiles.Clear();
            if (templateListView.SelectedItems.Count == 1)
            {
                if (!AllPropertiesHaveAValue)
                {
                    MessageService.ShowInformation(GResources.GetResourceText(29450499)  //RC 29450499 : Chcete-li vytvořit tento soubor je zapotřebí vyplnít pár vlastnosti.
                        + '\n' + GResources.GetResourceText(29450500)); //RC 29450500 : Vyplňte prvně vlastnosti
                    return;
                }
                TemplateItem item = (TemplateItem)templateListView.SelectedItems[0];

                PropertyService.Set("Dialogs.NewFileDialog.LastSelectedTemplate", item.Template.Name);

                string fileName;
                if (allowUntitledFiles)
                    fileName = GenerateCurrentFileName();
                else
                {
                    fileName = ControlDictionary["fileNameTextBox"].Text.Trim();
                    if (!FileUtility.IsValidPath(fileName)
                        || fileName.IndexOf(Path.AltDirectorySeparatorChar) >= 0
                        || fileName.IndexOf(Path.DirectorySeparatorChar) >= 0)
                    {
                        MessageService.ShowError(StringParser.Parse(string.Join(" ", GResources.GetResourceText(29450498), "'${FileName}'", GResources.GetResourceText(29450501)), new string[,] { { "FileName", fileName } })); //RC 29450498 : Název souboru
                        return;
                    }
                    if (Path.GetExtension(fileName).Length == 0)
                        fileName += Path.GetExtension(item.Template.DefaultName);
                    fileName = Path.Combine(basePath, fileName);
                    fileName = FileUtility.NormalizePath(fileName);
                }
                StringParser.Properties["FullName"] = fileName;
                StringParser.Properties["FileName"] = Path.GetFileName(fileName);
                StringParser.Properties["FileNameWithoutExtension"] = Path.GetFileNameWithoutExtension(fileName);
                StringParser.Properties["Extension"] = Path.GetExtension(fileName);
                StringParser.Properties["Path"] = Path.GetDirectoryName(fileName);
                //DataService.UpdateInfoSection();

                if (item.Template.WizardPath != null)
                {
                    Property customizer = new Property();
                    customizer.Set("Template", item.Template);
                    customizer.Set("Creator", this);
                    WizardDialog wizard = new WizardDialog(GResources.GetResourceText(29450495), customizer, item.Template.WizardPath); //RC 29450495 : Průvodce vytvoření souboru
                    if (wizard.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK)
                        DialogResult = DialogResult.OK;
                }
                else
                {
                    foreach (FileDescriptionTemplate newfile in item.Template.FileDescriptionTemplates)
                        if (!IsFilenameAvailable(StringParser.Parse(newfile.Name)))
                        {
                            MessageService.ShowError(string.Format(string.Join(" ", GResources.GetResourceText(29450498), "{0}", GResources.GetResourceText(29450497) + '\n' + GResources.GetResourceText(29450496)), StringParser.Parse(newfile.Name)));
                            return;
                        }

                    foreach (FileDescriptionTemplate newfile in item.Template.FileDescriptionTemplates)
                        SaveFile(newfile, newfile.ContentData != null ? null : newfile.Content, newfile.ContentData);
                    DialogResult = DialogResult.OK;

                    foreach (KeyValuePair<string, FileDescriptionTemplate> entry in CreatedFiles)
                        Parsers.Services.FileService.FireFileCreated(entry.Key, false);
                }
            }
        }
        void InitializeComponents()
        {
            System.Reflection.Assembly asm = Assembly;
            if (asm == null)
            {
                MessageService.ShowErrorFormatted(string.Format("{0}\n{1}", GResources.GetResourceText(29450490), GResources.GetResourceText(29450491))); //RC 29450491 : Modul není dostupný.
                return;
            }

            if (allowUntitledFiles)
                SetupLocalizedXFRM(asm.GetName().Name + ".Resources.forms.filedialog.NewFileDialog.xfrm");
            else
            {
                SetupLocalizedXFRM(asm.GetName().Name + ".Resources.forms.filedialog.NewFileWithNameDialog.xfrm");
                ControlDictionary["fileNameTextBox"].TextChanged += new EventHandler(FileNameChanged);
            }

            ImageList imglist = new ImageList
            {
                ColorDepth = ColorDepth.Depth32Bit
            };
            imglist.Images.Add(IconService.GetBitmap("Icons.16x16.OpenFolderBitmap"));
            imglist.Images.Add(IconService.GetBitmap("Icons.16x16.ClosedFolderBitmap"));

            templateListView = ((ListView)ControlDictionary["templateListView"]);
            categoryTreeView = ((TreeView)ControlDictionary["categoryTreeView"]);

            categoryTreeView.ImageList = imglist;

            categoryTreeView.AfterSelect += new TreeViewEventHandler(CategoryChange);
            categoryTreeView.BeforeSelect += new TreeViewCancelEventHandler(OnBeforeExpand);
            categoryTreeView.BeforeExpand += new TreeViewCancelEventHandler(OnBeforeExpand);
            categoryTreeView.BeforeCollapse += new TreeViewCancelEventHandler(OnBeforeCollapse);

            templateListView.SelectedIndexChanged += new EventHandler(SelectedIndexChange);
            templateListView.DoubleClick += new EventHandler(OpenEvent);

            ControlDictionary["openButton"].Click += new EventHandler(OpenEvent);

            ((RadioButton)ControlDictionary["largeIconsRadioButton"]).Checked = PropertyService.Get("Dialogs.NewProjectDialog.LargeImages", true);
            ((RadioButton)ControlDictionary["largeIconsRadioButton"]).CheckedChanged += new EventHandler(CheckedChange);
            ((RadioButton)ControlDictionary["largeIconsRadioButton"]).FlatStyle = FlatStyle.Standard;
            ((RadioButton)ControlDictionary["largeIconsRadioButton"]).Image = IconService.GetBitmap("Icons.16x16.LargeIconsIcon");

            ((RadioButton)ControlDictionary["smallIconsRadioButton"]).Checked = !PropertyService.Get("Dialogs.NewProjectDialog.LargeImages", true);
            ((RadioButton)ControlDictionary["smallIconsRadioButton"]).CheckedChanged += new EventHandler(CheckedChange);
            ((RadioButton)ControlDictionary["smallIconsRadioButton"]).FlatStyle = FlatStyle.Standard;
            ((RadioButton)ControlDictionary["smallIconsRadioButton"]).Image = IconService.GetBitmap("Icons.16x16.SmallIconsIcon");

            ToolTip tooltip = new ToolTip();
            tooltip.SetToolTip(ControlDictionary["largeIconsRadioButton"], GResources.GetResourceText(29450502)); //RC 29450502 : Velké ikonky
            tooltip.SetToolTip(ControlDictionary["smallIconsRadioButton"], GResources.GetResourceText(29450503)); //RC 29450503 : Malé ikonky
            tooltip.Active = true;
            Owner = SimpleDesktop.MainForm;
            StartPosition = FormStartPosition.CenterParent;

            CheckedChange(this, EventArgs.Empty);
        }
    }
}
