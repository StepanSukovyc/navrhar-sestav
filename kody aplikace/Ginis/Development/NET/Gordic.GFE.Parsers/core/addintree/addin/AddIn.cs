//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.AddIn.cs                                 </Name>
//    <Description> Položka stromu AddIn                                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Xml;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Položka stromu AddIn
    /// </summary>
    public sealed class AddIn
    {
        string customErrorMessage;
        /// <summary>
        /// Používá se pouze v případě, že AddInAction je nastaven na CustomError.
        /// </summary>
        public string CustomErrorMessage
        {
            get { return customErrorMessage; }
            internal set
            {
                if (value != null)
                {
                    Enabled = false;
                    Action = AddInAction.CustomError;
                }
                customErrorMessage = value;
            }
        }

        /// <summary>
        /// Akce, spuštěná po restartu aplikace
        /// </summary>
        public AddInAction Action { get; set; } = AddInAction.Disable;

        /// <summary>
        /// Běhová prostředi
        /// </summary>
        public List<Runtime> Runtimes { get; } = new List<Runtime>();

        internal string addInFileName = null;
        /// <summary>
        /// Název suboru doplňku
        /// </summary>
        public string FileName { get { return addInFileName; } }

        /// <summary>
        /// Vlastností
        /// </summary>
        public Property Properties { get; private set; } = new Property();

        /// <summary>
        /// Zdroje obrázku
        /// </summary>
        public List<string> BitmapResources { get; set; } = new List<string>();

        /// <summary>
        /// Zdroje textů
        /// </summary>
        public List<string> StringResources { get; set; } = new List<string>();

        /// <summary>
        /// Manifest
        /// </summary>
        public AddInManifest Manifest { get; } = new AddInManifest();

        bool enabled;
        /// <summary>
        /// Dostupnost
        /// </summary>
        public bool Enabled
        {
            get { return enabled; }
            set
            {
                enabled = value;
                this.Action = value ? AddInAction.Enable : AddInAction.Disable;
            }
        }

        /// <summary>
        /// Seznam větví doplňku
        /// </summary>
        public Dictionary<string, ExtensionPath> Paths { get; } = new Dictionary<string, ExtensionPath>();

        Version version;
        /// <summary>
        /// Verze doplňku
        /// </summary>
        public Version Version
        {
            get
            {
                if (version == null)
                {
                    string vers = Properties["version"];
                    if (!string.IsNullOrEmpty(vers))
                    {
                        List<string> ver = vers.Split('.').ToList();
                        if (ver.Count > 4)
                            while (ver.Count != 4)
                                ver.Remove(ver.Last());
                        if (ver.Count < 4)
                            while (ver.Count < 4)
                                ver.Add("0");

                        version = new Version(string.Join(".", ver.ToArray<string>()));
                    }
                }
                return version;
            }
        }

        /// <summary>
        /// Název
        /// </summary>
        public string Name { get { return Properties["name"]; } }

        static bool hasShownErrorMessage = false;
        bool dependenciesLoaded;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        internal AddIn() { }

        /// <summary>
        /// Získání cesty
        /// </summary>
        /// <param name="pathName">Název cesty</param>
        /// <param name="iconName">Název obrázku</param>
        /// <param name="insertafter">hodnota atributu 'insertafter'</param>
        /// <returns></returns>
        public ExtensionPath GetExtensionPath(string pathName, string iconName, string insertafter)
        {
            return !Paths.ContainsKey(pathName) ? Paths[pathName] = new ExtensionPath(pathName, this, iconName, insertafter) : Paths[pathName];
        }

        /// <summary>
        /// Vytvoření objektu
        /// </summary>
        /// <param name="className">Název třídy objektu</param>
        /// <returns>Objekt uvedené třídy</returns>
        public object CreateObject(string className)
        {
            LoadDependencies();
            foreach (Runtime runtime in Runtimes)
            {
                object o = runtime.CreateInstance(className);
                if (o != null)
                    return o;
            }

            Type type = GetCustomType(className);
            if (type != null)
            {
                object o = Activator.CreateInstance(type);
                if (o != null)
                    return o;
            }

            if (hasShownErrorMessage)
                LoggingService.Error(string.Format(GResources.GetResourceText(29450123) + " {0} " + GResources.GetResourceText(29450124), className)); //RC 29450124 : nelze vytvořit.
            else
            {
                hasShownErrorMessage = true;
                MessageService.ShowErrorFormatted(GResources.GetResourceText(29450123) + " {0} " + GResources.GetResourceText(29450124) + '\n' + GResources.GetResourceText(29450125), className); //RC 29450125 : Budoucí chybějící objekty nebudou vyvolávát chybové zprávy!
            }
            return null;
        }

        /// <summary>
        /// Načtení sestav
        /// </summary>
        public void LoadRuntimeAssemblies()
        {
            LoadDependencies();
            foreach (Runtime runtime in Runtimes)
                runtime.Load();
        }

        /// <summary>
        /// Načtení doplňku z paměti
        /// </summary>
        /// <returns>Načtený doplněk</returns>
        public static AddIn Load()
        {
            Assembly asm = Assembly.GetAssembly(typeof(AddIn));
            string resourceFileMask = @"^*Resources.config.*.gconfig";
            string[] manifestResourceNames = asm.GetManifestResourceNames();

            Regex reg = new Regex(resourceFileMask);
            foreach (string item in manifestResourceNames)
                if (reg.IsMatch(item))
                    using (Stream s = asm.GetManifestResourceStream(item))
                        using (StreamReader r = new StreamReader(s))
                            return Load(r, defaultResAssembly: asm);

            return null;
        }

        /// <summary>
        /// Načtení doplňku
        /// </summary>
        /// <param name="textReader">čtečka</param>
        /// <param name="hintPath">cesta</param>
        /// <param name="defaultResAssembly">knihovna pro resources</param>
        /// <returns></returns>
        public static AddIn Load(TextReader textReader, string hintPath = null, Assembly defaultResAssembly = null)
        {
            if (defaultResAssembly != null)
                textReader = GResLocalizer.Localize(textReader, defaultResAssembly);

            AddIn addIn = new AddIn();
            using (XmlTextReader reader = new XmlTextReader(textReader))
            {
                while (reader.Read())
                    if (reader.IsStartElement())
                        switch (reader.LocalName.ToLowerInvariant())
                        {
                            case "addin":
                                addIn.Properties = Property.ReadFromAttributes(reader);                                
                                SetupAddIn(reader, addIn, hintPath);
                                break;
                            default:
                                MessageService.ShowError(GResources.GetResourceText(29450131)); //RC 29450131 : Neznámý soubor doplňků!
                                break;
                        }
            }
            return addIn;
        }
        /// <summary>
        /// Načtení doplňku
        /// </summary>
        /// <param name="fileName">Název souboru</param>
        /// <param name="defaultResAssembly">knihovna pro resources</param>
        /// <returns></returns>
        public static AddIn Load(string fileName, Assembly defaultResAssembly = null)
        {
            try
            {
                using (TextReader textReader = File.OpenText(fileName))
                {
                    AddIn addIn = Load(textReader, Path.GetDirectoryName(fileName), defaultResAssembly);
                    addIn.addInFileName = fileName;
                    return addIn;
                }
            }
            catch (Exception ex) { throw new AddInLoadException(
                string.Join(" ", GResources.GetResourceText(29450132), fileName, GResources.GetResourceText(29450133))
                , ex); } //RC 29450133 : nelze načíst!
        }

        static void SetupAddIn(XmlReader reader, AddIn addIn, string hintPath)
        {
            while (reader.Read())
            {
                if (reader.NodeType == XmlNodeType.Element && reader.IsStartElement())
                {
                    switch (reader.LocalName)
                    {
                        case "StringResources":
                        case "BitmapResources":
                            if (reader.AttributeCount != 1)
                                MessageService.ShowError("BitmapResources:\n" + GResources.GetResourceText(29450127)); //RC 29450127 : Je požadován pouze JEDEN atribut!

                            string filename = StringParser.Parse(reader.GetAttribute("file"));

                            if (reader.LocalName == "BitmapResources")
                                addIn.BitmapResources.Add(filename);
                            else
                                addIn.StringResources.Add(filename);
                            break;
                        case "Runtime":
                            if (!reader.IsEmptyElement)
                                Runtime.ReadSection(reader, addIn, hintPath);
                            break;
                        case "Include":
                            if (reader.AttributeCount != 1)
                                MessageService.ShowError("Include:\n" + GResources.GetResourceText(29450127));
                            if (!reader.IsEmptyElement)
                                MessageService.ShowError("Include:\n" + GResources.GetResourceText(29450128)); //RC 29450128 : Vnořená větev musí být prázdná!
                            if (hintPath == null)
                                MessageService.ShowError("Include:\n" + GResources.GetResourceText(29450129)); //RC 29450129 : Nelze použit vnořené větve pokud hintPath není specifikován (tj. pokud AddInManager čte *.gconfig soubor)!

                            string fileName = Path.Combine(hintPath, reader.GetAttribute(0));
                            XmlReaderSettings xrs = new XmlReaderSettings
                            {
                                ConformanceLevel = ConformanceLevel.Fragment
                            };
                            using (XmlReader includeReader = XmlTextReader.Create(fileName, xrs))
                            {
                                SetupAddIn(includeReader, addIn, Path.GetDirectoryName(fileName));
                            }
                            break;
                        case "Path":
                            /*if (reader.AttributeCount != 1)
                                MessageService.ShowError("Je požadován pouze JEDEN atribut.");*/
                            string pathName = reader.GetAttribute("name");
                            if (!string.IsNullOrEmpty(pathName))
                            {
                                ExtensionPath extensionPath = addIn.GetExtensionPath(pathName, reader.GetAttribute("icon"), reader.GetAttribute("insertafter"));
                                if (!reader.IsEmptyElement)
                                    ExtensionPath.SetUp(extensionPath, reader, "Path");
                            }
                            else return;
                            break;
                        case "Manifest":
                            addIn.Manifest.ReadManifestSection(reader, hintPath);
                            break;
                        default:
                            MessageService.ShowErrorFormatted(GResources.GetResourceText(29450130) + '\n' + "{0}!", reader.LocalName); //RC 29450130 : Neplatná cesta kořenové větve:
                            break;
                    }
                }
            }
        }

        void LoadDependencies()
        {
            if (!dependenciesLoaded)
            {
                dependenciesLoaded = true;
                foreach (AddInReference r in Manifest.Dependencies)
                    if (r.RequirePreload)
                    {
                        bool found = false;
                        foreach (AddIn addIn in AddInTree.AddIns)
                            if (addIn.Manifest.Identities.ContainsKey(r.Name))
                            {
                                found = true;
                                addIn.LoadRuntimeAssemblies();
                            }
                        if (!found)
                            throw new AddInLoadException(GResources.GetResourceText(29450126) + ' ' + r.ToString() + '!'); //RC 29450126 : Za běhu nelze načíst závislost
                    }
            }
        }

        /// <summary>
        /// Získání speciálního typu dle názvu třídy
        /// </summary>
        /// <param name="className">Název třídy hledaného typu</param>
        /// <returns>Typ třídy</returns>
        Type GetCustomType(string className)
        {
            switch (className)
            {
                case "System.Drawing.ColorConverter":
                case "Drawing.ColorConverter":
                case "ColorConverter":
                    return typeof(System.Drawing.ColorConverter);
                default:
                    break;
            }

            return null;
        }

        /// <summary>
        /// Převod na řetězec
        /// </summary>
        /// <returns></returns>
        public override string ToString() { return "[AddIn: " + Name + "]"; }
    }
}
