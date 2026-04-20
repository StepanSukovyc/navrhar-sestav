//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddInTree.cs                             </Name>
//    <Description> Statická třída obsahující AddInTree.                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Resources;
using Gordic.GFE.Parsers.DefaultEditor;
using Gordic.General;
using Gordic.GFE.Parsers.AddInManager;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Statická třída obsahující AddInTree. 
    /// Obsahuje metody pro přístup k větvím stromu a vytvoření položek.
    /// </summary>
    public static class AddInTree
    {
        static bool initializedCore = false;
        static List<AddIn> addIns = new List<AddIn>();
        static readonly AddInTreeNode rootNode = new AddInTreeNode();

        static Dictionary<string, IMaker> makers = new Dictionary<string, IMaker>();
        static Dictionary<string, IConditionEvaluator> conditionEvaluators = new Dictionary<string, IConditionEvaluator>();

        static AddInTree()
        {
            makers.Add("Class", new ClassMaker());
            makers.Add("FileFilter", new FileFilterMaker());
            makers.Add("String", new StringMaker());
            makers.Add("Icon", new IconMaker());
            makers.Add("MenuItem", new MenuItemMaker());
            makers.Add("ToolbarItem", new ToolbarItemMaker());
            makers.Add("Include", new IncludeMaker());
            makers.Add("EditAction", new EditActionMaker());

            makers.Add("Dictionary", new DictionaryMaker());
            makers.Add("DictionaryItem", new DictionaryItemMaker());
            makers.Add("DictionaryConverterItem", new DictionaryConverterItemMaker());
            makers.Add("IncludeDictionary", new IncludeDictionaryMaker());

            makers.Add("List", new ListMaker());
            makers.Add("ListItem", new ListItemMaker());
            makers.Add("IncludeList", new IncludeListMaker());

            makers.Add("DragDropItem", new DragDropItemMaker());
            makers.Add("DisplayBinding", new DisplayBindingMaker());
            makers.Add("ResourceFile", new ResourceFileMaker());
            makers.Add("Parser", new ParserMaker());
            makers.Add("DialogPanel", new DialogPanelMaker());

            makers.Add("CodeCompletionBinding", new CodeCompletionBindingMaker());

            conditionEvaluators.Add("Compare", new CompareConditionEvaluator());
            conditionEvaluators.Add("Ownerstate", new OwnerStateConditionEvaluator());
            conditionEvaluators.Add("AssemblyNotExists", new AssemblyNotExistsConditionEvaluator());
            conditionEvaluators.Add("AddInManagerAddInState", new AddInManagerAddInStateConditionEvaluator());

            ApplicationStateInfoService.RegisterStateGetter(GResources.GetResourceText(29450179), GetInstalledThirdPartyAddInsListAsString); //RC 29450179 : Instalované doplňky třetích strán
        }

        static object GetInstalledThirdPartyAddInsListAsString()
        {
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            foreach (AddIn addIn in AddIns)
            {
                if (FileUtility.IsBaseDirectory(FileUtility.ApplicationRootPath, addIn.FileName))
                {
                    string hidden = addIn.Properties["addInManagerHidden"];
                    if (string.Equals(hidden, "true", StringComparison.OrdinalIgnoreCase) || string.Equals(hidden, "preinstalled", StringComparison.OrdinalIgnoreCase))
                        continue;
                }
                if (sb.Length > 0) sb.Append(", ");
                sb.Append("[");
                sb.Append(addIn.Name);
                if (addIn.Version != null)
                {
                    sb.Append(' ');
                    sb.Append(addIn.Version.ToString());
                }
                if (!addIn.Enabled)
                {
                    sb.Append(", Enabled=");
                    sb.Append(addIn.Enabled);
                }
                if (addIn.Action != AddInAction.Enable)
                {
                    sb.Append(", Action=");
                    sb.Append(addIn.Action.ToString());
                }
                sb.Append("]");
            }
            return sb.ToString();
        }

        /// <summary>
        /// Vrácí seznam načtených AddIns.
        /// </summary>
        public static IList<AddIn> AddIns { get { return addIns.AsReadOnly(); } }

        /// <summary>
        /// Vrácí knihovnu registrovaných vnástrojů.
        /// </summary>
        public static Dictionary<string, IMaker> Makers { get { return makers; } }

        /// <summary>
        /// Vrácí knihovnu registrovaných nástrojů pro hodnoceníí podmínek.
        /// </summary>
        public static Dictionary<string, IConditionEvaluator> ConditionEvaluators { get { return conditionEvaluators; } }

        /// <summary>
        /// Kontroluje, zda zadaná cesta existuje ve stromu AddIn.
        /// </summary>
        /// <param name="path">Uvedená cesta</param>
        public static bool ExistsTreeNode(string path)
        {
            if (string.IsNullOrEmpty(path))
                return true;

            string[] splittedPath = path.Split('/');
            AddInTreeNode curPath = rootNode;
            int i = 0;
            while (i < splittedPath.Length)
            {
                if (!curPath.ChildNodes.TryGetValue(splittedPath[i], out curPath))
                    return false;
                ++i;
            }
            return true;
        }

        /// <summary>
        /// Vrácí <see cref="AddInTreeNode"/> prezentující specifckou cestu.
        /// Pokud cesta neexistuje, vyhodí výjimku. 
        /// </summary>
        /// <param name="path">Kontrolovaná cesta</param>
        public static AddInTreeNode GetTreeNode(string path)
        {
            return GetTreeNode(path, true);
        }

        /// <summary>
        /// Vrácí <see cref="AddInTreeNode"/> prezentující specifckou cestu.
        /// </summary>
        /// <param name="path">Cesta v AddIn stromu</param>
        /// <param name="throwOnNotFound">
        /// Pokud nastaveno na <c>true</c>, metoda vrácí výjimku
        /// <see cref="TreePathNotFoundException"/> pokud cesta neexistuje.
        /// Pokud nastaveno na <c>false</c>, <c>null</c> vrácí neexistující cestu.
        /// </param>
        public static AddInTreeNode GetTreeNode(string path, bool throwOnNotFound)
        {
            if (string.IsNullOrEmpty(path))
                return rootNode;

            string[] splittedPath = path.Split('/');
            AddInTreeNode curPath = rootNode;
            int i = 0;
            while (i < splittedPath.Length)
            {
                if (!curPath.ChildNodes.TryGetValue(splittedPath[i], out curPath))
                    if (throwOnNotFound)
                        throw new TreePathNotFoundException(path);
                    else
                        return null;
                ++i;
            }
            return curPath;
        }

        /// <summary>
        /// Vytvořeí jedné položky v AddIn stromu.
        /// </summary>
        /// <param name="path">Cesta k položce v AddIn stromu.</param>
        /// <param name="caller">Vlastník, který se použije pro vytvoření položky.</param>
        /// <exception cref="TreePathNotFoundException">Buď neexistuje cesta nebo odkaz na položku.</exception>
        public static object BuildItem(string path, object caller)
        {
            int pos = path.LastIndexOf('/');
            string parent = path.Substring(0, pos);
            string child = path.Substring(pos + 1);
            AddInTreeNode node = GetTreeNode(parent);
            return node.BuildChildItem(child, caller, new ArrayList(BuildItems<object>(path, caller, false)));
        }

        /// <summary>
        /// Vytvoři položky dle cesty. Je zapotřeí se přesvědčit, že všechny položky jsou typu T.
        /// Výhodí výjimku <see cref="TreePathNotFoundException"/> pokud cesta neexistuje.
        /// </summary>
        /// <param name="path">Cesta v AddIn stromu.</param>
        /// <param name="caller">Vlastník pro vytvoření objektů.</param>
        public static List<T> BuildItems<T>(string path, object caller)
        {
            return BuildItems<T>(path, caller, true);
        }

        /// <summary>
        /// Vytvoři položky dle cesty. Je zapotřeí se přesvědčit, že všechny položky jsou typu T.
        /// </summary>
        /// <param name="path">Cesta v AddIn stromu.</param>
        /// <param name="caller">Vlastník pro vytvoření objektů.</param>
        /// <param name="throwOnNotFound">Pokud true, vyhodí výjimku <see cref="TreePathNotFoundException"/>
        /// pokud cesta nebyla nalezená. Pokud false, se vrácí prázdný ArrayList v případě, že cesta nebude nalezená.</param>
        public static List<T> BuildItems<T>(string path, object caller, bool throwOnNotFound)
        {
            AddInTreeNode node = GetTreeNode(path, throwOnNotFound);
            return node == null ? new List<T>() : node.BuildChildItems<T>(caller);
        }

        static AddInTreeNode CreatePath(AddInTreeNode localRoot, ExtensionPath path)
        {
            if (path == null || string.IsNullOrEmpty(path.Name))
                return localRoot;

            string[] splittedPath = path.Name.Split('/');
            AddInTreeNode curPath = localRoot;

            int i = 0;
            while (i < splittedPath.Length)
            {
                if (!curPath.ChildNodes.ContainsKey(splittedPath[i]))
                    curPath.ChildNodes[splittedPath[i]] = new AddInTreeNode() { Name = splittedPath[i], Icon = path.Icon, InsertAfter = path.InsertAfter };

                curPath = curPath.ChildNodes[splittedPath[i]];
                ++i;
            }

            return curPath;
        }

        static void AddExtensionPath(ExtensionPath path)
        {
            AddInTreeNode treePath = CreatePath(rootNode, path);

            foreach (Entity entity in path.Entities)
                treePath.Entities.Add(entity);
        }

        /// <summary>
        /// Specifický AddIn se přidá do kolekce <see cref="AddIns"/>.
        /// Pokud doplněk je dostupný, pak jeho makers, ohodnocovače podmínek a 
        /// cesty se přidají do AddInTree a zdroje se přidají do <see cref="ResourceService"/>.
        /// </summary>
        /// <param name="addIn">Přidávaný doplněk</param>
        public static void InsertAddIn(AddIn addIn)
        {
            if (addIn.Enabled)
            {
                foreach (ExtensionPath path in addIn.Paths.Values)
                    AddExtensionPath(path);

                foreach (Runtime runtime in addIn.Runtimes)
                    if (runtime.IsActive)
                    {
                        foreach (LazyLoadMaker maker in runtime.DefinedMakers)
                        {
                            if (!AddInTree.Makers.ContainsKey(maker.Name))
                                AddInTree.Makers.Add(maker.Name, maker);
                            else
                                LoggingService.InfoFormatted(GResources.GetResourceText(29450180) +": {0}.", maker.Name); //RC 29450180 : Duplicitní výrobce komponent

                        }
                        foreach (LazyConditionEvaluator condition in runtime.DefinedConditionEvaluators)
                        {
                            if (!AddInTree.ConditionEvaluators.ContainsKey(condition.Name))
                                AddInTree.ConditionEvaluators.Add(condition.Name, condition);
                            else
                                LoggingService.InfoFormatted(GResources.GetResourceText(29450181) + ": {0}.", condition.Name); //RC 29450181 : Duplicitní nástroj hodnocení podmínek
                        }
                    }

                string addInRoot = Path.GetDirectoryName(addIn.FileName);
                foreach (string bitmapResource in addIn.BitmapResources)
                {
                    string path = Path.Combine(addInRoot, bitmapResource);
                    ResourceManager resourceManager = ResourceManager.CreateFileBasedResourceManager(Path.GetFileNameWithoutExtension(path), Path.GetDirectoryName(path), null);
                    ResourceService.RegisterNeutralImages(resourceManager);
                }

                foreach (string stringResource in addIn.StringResources)
                {
                    string path = Path.Combine(addInRoot, stringResource);
                    ResourceManager resourceManager = ResourceManager.CreateFileBasedResourceManager(Path.GetFileNameWithoutExtension(path), Path.GetDirectoryName(path), null);
                    ResourceService.RegisterNeutralStrings(resourceManager);
                }
                // ???
                foreach (string bitmapResource in addIn.BitmapResources)
                    ResourceService.RegisterNeutralImages(new ResourceManager(bitmapResource, Assembly.GetExecutingAssembly()));

                foreach (string stringResource in addIn.StringResources)
                    ResourceService.RegisterNeutralStrings(new ResourceManager(stringResource, Assembly.GetExecutingAssembly()));
                // ???? ^
            }
            addIns.Add(addIn);
        }

        /// <summary>
        /// Odstranění specifického doplňku z kolekce <see cref="AddIns"/>.
        /// </summary>
        /// <exception cref="ArgumentException">Nastane, když se chystam odstranit povolený doplněk.</exception>
        public static void RemoveAddIn(AddIn addIn)
        {
            if (addIn.Enabled)
                throw new ArgumentException(GResources.GetResourceText(29450182)); //RC 29450182 : Za běhu aplikace povolený doplněk nelze odstranit!

            addIns.Remove(addIn);
        }

        static void DisableAddin(AddIn addIn, Dictionary<string, Version> dict, Dictionary<string, AddIn> addInDict)
        {
            addIn.Enabled = false;
            addIn.Action = AddInAction.DependencyError;
            foreach (string name in addIn.Manifest.Identities.Keys)
            {
                dict.Remove(name);
                addInDict.Remove(name);
            }
        }

        /// <summary>
        /// Načtení základní konfigurace
        /// </summary>
        public static void InitializeCore()
        {
            if (initializedCore)
                return;

            AddIn addIn = AddIn.Load();
            if (addIn == null)
                return;

            if (addIn.Action == AddInAction.CustomError)
                InsertAddIn(addIn);
            else
            {
                addIn.Enabled = true;
                InsertAddIn(addIn);
            }
            initializedCore = true;
        }

        /// <summary>
        /// Načtení .addin souborů, a zajištění splněností závislosti.
        /// </summary>
        /// <param name="addInFiles">
        /// Seznam názvů .addin souborů pro načtení.
        /// </param>
        /// <param name="disabledAddIns">
        /// Seznam nedostupných AddIn.
        /// </param>
        /// <param name="defaultResAssembly">knihovna pro resources</param>
        public static void Load(List<string> addInFiles, List<string> disabledAddIns, Assembly defaultResAssembly)
        {
            InitializeCore();

            List<AddIn> list = new List<AddIn>();
            Dictionary<string, Version> dict = new Dictionary<string, Version>();
            Dictionary<string, AddIn> addInDict = new Dictionary<string, AddIn>();
            foreach (string fileName in addInFiles)
            {
                AddIn addIn;
                try { addIn = AddIn.Load(fileName, defaultResAssembly); }
                catch (Exception ex)
                {
                    LoggingService.Error(ex);
                    if (ex.InnerException != null)
                        MessageService.ShowError(ex, string.Format(GResources.GetResourceText(29450183) + " {0}:\n{1}!", fileName, ex.InnerException.Message)); //RC 29450183 : Chyba načtení doplňku
                    else
                        MessageService.ShowError(ex, string.Format(GResources.GetResourceText(29450183) + " {0}:\n{1}!", fileName, ex.Message)); //RC 29450183 : Chyba načtení doplňku

                    addIn = new AddIn
                    {
                        addInFileName = fileName,
                        CustomErrorMessage = ex.Message
                    };
                }
                if (addIn.Action == AddInAction.CustomError)
                {
                    list.Add(addIn);
                    continue;
                }
                addIn.Enabled = true;
                if (disabledAddIns != null && disabledAddIns.Count > 0)
                    foreach (string name in addIn.Manifest.Identities.Keys)
                        if (disabledAddIns.Contains(name))
                        {
                            addIn.Enabled = false;
                            break;
                        }

                if (addIn.Enabled)
                    foreach (KeyValuePair<string, Version> pair in addIn.Manifest.Identities)
                    {
                        if (dict.ContainsKey(pair.Key))
                        {
                            MessageService.ShowError(string.Format(string.Join(" ", GResources.GetResourceText(29450184), "{0}", GResources.GetResourceText(29450185), "'{1}'", GResources.GetResourceText(29450186), "'{2}'!"), pair.Key, addInDict[pair.Key].FileName, fileName)); //RC 29450186 : a
                            addIn.Enabled = false;
                            addIn.Action = AddInAction.InstalledTwice;
                            break;
                        }
                        else
                        {
                            dict.Add(pair.Key, pair.Value);
                            addInDict.Add(pair.Key, addIn);
                        }
                    }

                list.Add(addIn);
            }
            foreach (AddIn addIn in list)
            {
                try { InsertAddIn(addIn); }
                catch (Exception ex)
                {
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450183) + " {0}:\n{1}!", addIn.FileName, ex.Message); //RC 29450183 : Chyba načtení doplňku
                }
            }
        }
    }
}
