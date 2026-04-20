//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.Runtime.cs                               </Name>
//    <Description> Běhové prostředí                                            </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Xml;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Běhové prostředí
    /// </summary>
    public class Runtime
    {
        IList<LazyLoadMaker> definedMakers = new List<LazyLoadMaker>();
        /// <summary>
        /// Defonované vytvářeče objektů
        /// </summary>
        public IList<LazyLoadMaker> DefinedMakers { get { return definedMakers; } }

        IList<LazyConditionEvaluator> definedConditionEvaluators = new List<LazyConditionEvaluator>();
        /// <summary>
        /// Definované nástroje pro hodnocení
        /// </summary>
        public IList<LazyConditionEvaluator> DefinedConditionEvaluators { get { return definedConditionEvaluators; } }

        Assembly loadedAssembly = null;
        /// <summary>
        /// Modul sestavení, které se podařilo načíst
        /// </summary>
        public Assembly LoadedAssembly
        {
            get
            {
                Load(); // načtení sestavení, pokud ještě není načtené
                return loadedAssembly;
            }
        }

        string assembly;
        /// <summary>
        /// Název/cesta k modulu sestavení
        /// </summary>
        public string Assembly { get { return assembly; } }

        bool isActive = true;
        /// <summary>
        /// Je aktivní
        /// </summary>
        public bool IsActive
        {
            get
            {
                if (conditions != null)
                {
                    isActive = Condition.GetFailedAction(conditions, this) == ConditionFailedAction.Nothing;
                    conditions = null;
                }
                return isActive;
            }
        }

        bool isAssemblyLoaded;
        readonly string hintPath;
        ICondition[] conditions;

        /// <summary>
        /// Instance nové třídy
        /// </summary>
        /// <param name="assembly">Knihovna</param>
        /// <param name="hintPath">Cesta</param>
        public Runtime(string assembly, string hintPath)
        {
            this.assembly = assembly;
            this.hintPath = hintPath;
        }

        /// <summary>
        /// Vynucené načtení sestavy.
        /// </summary>
        public void Load()
        {
            if (!isAssemblyLoaded)
            {
                LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450152), assembly)); //RC 29450152 : načtení doplňku sestavení
                isAssemblyLoaded = true;
                try
                {
                    if (assembly[0] == ':')
                        try
                        {
                            loadedAssembly = System.Reflection.Assembly.Load(assembly.Substring(1));
                            if (loadedAssembly == null)
                                loadedAssembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(modul => modul.GetName().Name.Equals(assembly.Substring(1), StringComparison.InvariantCultureIgnoreCase));
                        }
                        catch { loadedAssembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(modul => modul.GetName().Name.Equals(assembly.Substring(1), StringComparison.InvariantCultureIgnoreCase)); }
                    else if (assembly[0] == '$')
                    {
                        // buď je to odkaz na sestavení relativní cestou
                        int pos = assembly.IndexOf('/');
                        if (pos < 0)
                            throw new ApplicationException(GResources.GetResourceText(29450575));

                        string referencedAddIn = assembly.Substring(1, pos - 1);
                        foreach (AddIn addIn in AddInTree.AddIns)
                            if (addIn.Enabled && addIn.Manifest.Identities.ContainsKey(referencedAddIn))
                            {
                                string assemblyFile = Path.Combine(Path.GetDirectoryName(addIn.FileName),
                                                                   assembly.Substring(pos + 1));

                                loadedAssembly = System.Reflection.Assembly.LoadFrom(assemblyFile);
                                break;
                            }

                        // nebo je to přímo cesta k doplňku
                        if (loadedAssembly == null)
                        {
                            string assemblyFile = assembly.Substring(1);
                            if (File.Exists(assemblyFile))
                                loadedAssembly = System.Reflection.Assembly.LoadFrom(assemblyFile);
                        }

                        if (loadedAssembly == null)
                            throw new FileNotFoundException(GResources.GetResourceText(29450576) + " " + referencedAddIn);
                    }
                    else
                        loadedAssembly = System.Reflection.Assembly.LoadFrom(Path.Combine(hintPath, assembly));
                }
                catch (FileNotFoundException ex)
                {
                    MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450153), "'{0}'", GResources.GetResourceText(29450154)) + ":\n{1}!", assembly, ex); //RC 29450154 : nelze načíst
                }
                catch (FileLoadException ex)
                {
                    MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450153), "'{0}'", GResources.GetResourceText(29450154)) + ":\n{1}!", assembly, ex); //RC 29450154 : nelze načíst
                }
                catch (Exception ex)
                {
                    MessageService.ShowErrorFormatted(string.Join(" ", GResources.GetResourceText(29450155), "'{0}'\n"), assembly, ex.Message); //RC 29450155 : Nespecifikovaná chyba načtení doplňku
                }
                if (loadedAssembly != null)
                    LoggingService.Info(assembly + " " + GResources.GetResourceText(29450577));
                else
                    LoggingService.Info(assembly + " " + GResources.GetResourceText(29450578));
            }
        }

        /// <summary>
        /// Vytvoření instance
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        public object CreateInstance(string instance)
        {
            if (IsActive)
            {
                Assembly asm = LoadedAssembly;
                return asm?.CreateInstance(instance);
            }
            else
                return null;
        }

        /// <summary>
        /// Načtení sekce
        /// </summary>
        /// <param name="reader">čtečka</param>
        /// <param name="addIn">větev</param>
        /// <param name="hintPath">cesta</param>
        internal static void ReadSection(XmlReader reader, AddIn addIn, string hintPath)
        {
            Stack<ICondition> conditionStack = new Stack<ICondition>();
            while (reader.Read())
            {
                switch (reader.NodeType)
                {
                    case XmlNodeType.EndElement:
                        if (reader.LocalName.Equals("Condition", StringComparison.InvariantCultureIgnoreCase)
                            || reader.LocalName.Equals("ComplexCondition", StringComparison.InvariantCultureIgnoreCase))
                            conditionStack.Pop();
                        else if (reader.LocalName.Equals("Runtime", StringComparison.InvariantCultureIgnoreCase))
                            return;
                        break;
                    case XmlNodeType.Element:
                        switch (reader.LocalName.ToLowerInvariant())
                        {
                            case "condition":
                                conditionStack.Push(Condition.Read(reader));
                                break;
                            case "complexcondition":
                                conditionStack.Push(Condition.ReadComplexCondition(reader));
                                break;
                            case "import":
                                addIn.Runtimes.Add(Runtime.Read(addIn, reader, hintPath, conditionStack));
                                break;
                            case "disableaddin":
                                if (Condition.GetFailedAction(conditionStack, addIn) == ConditionFailedAction.Nothing)
                                    addIn.CustomErrorMessage = reader.GetAttribute("message");
                                break;
                            default:
                                throw new Exception(string.Format(string.Join(" ", GResources.GetResourceText(29450156), "{0}!"), reader.LocalName)); //RC 29450156 : Neznámý úzel v sekci runtime:
                        }
                        break;
                }
            }
        }

        static readonly List<Runtime> runtimes = new List<Runtime>();

        /// <summary>
        /// Načtení
        /// </summary>
        /// <param name="addIn">větev</param>
        /// <param name="reader">čtečka</param>
        /// <param name="hintPath">cesta</param>
        /// <param name="conditionStack"></param>
        /// <returns></returns>
        internal static Runtime Read(AddIn addIn, XmlReader reader, string hintPath, Stack<ICondition> conditionStack)
        {
            if (reader.AttributeCount != 1)
                throw new Exception(GResources.GetResourceText(29450127)); //RC 29450127 : Je požadován pouze JEDEN atribut!

            Runtime runtime = new Runtime(reader.GetAttribute(0), hintPath);
            if (conditionStack.Count > 0)
                runtime.conditions = conditionStack.ToArray();

            if (!reader.IsEmptyElement)
                while (reader.Read())
                {
                    switch (reader.NodeType)
                    {
                        case XmlNodeType.EndElement:
                            if (reader.LocalName == "Import")
                                return runtime;
                            break;
                        case XmlNodeType.Element:
                            string nodeName = reader.LocalName;
                            Property properties = Property.ReadFromAttributes(reader);
                            switch (nodeName.ToLowerInvariant())
                            {
                                case "maker":
                                    if (!reader.IsEmptyElement)
                                        throw new Exception("maker:" + GResources.GetResourceText(29450157)); //RC 29450157 : Větev nástroje vytváření objektů musí být prázdná!

                                    runtime.definedMakers.Add(new LazyLoadMaker(addIn, properties));
                                    break;
                                case "conditionevaluator":
                                    if (!reader.IsEmptyElement)
                                        throw new Exception("conditionevaluator:" + GResources.GetResourceText(29450158)); //RC 29450158 : větev musí být prázdná!
                                    runtime.definedConditionEvaluators.Add(new LazyConditionEvaluator(addIn, properties));
                                    break;
                                default:
                                    throw new Exception(string.Format(string.Join(" ", GResources.GetResourceText(29450159), "{0}!"), nodeName)); //RC 29450159 : Neznáma větev v sekci Import:
                            }
                            break;
                    }
                }

            runtime.definedMakers = (runtime.definedMakers as List<LazyLoadMaker>).AsReadOnly();
            runtime.definedConditionEvaluators = (runtime.definedConditionEvaluators as List<LazyConditionEvaluator>).AsReadOnly();
            return runtime;
        }
    }
}
