//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Gfe.FormFiller.LayoutConfiguration.cs                </Name>
//    <Description> Konfigurace rozložení                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.IO;
using System.Xml;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.General;

namespace Gordic.Gfe.FormFiller.Gui
{
    /// <summary>
    /// Konfigurace rozložení
    /// </summary>
    class LayoutConfiguration
    {
        /// <summary>
        /// umístění zdrojů dat
        /// </summary>
        public const string DataLayoutSubPath = "resources\\layouts";
        const string configFile = "LayoutConfig.xml";
        /// <summary>
        /// Výčet možných rozložení
        /// </summary>
        public static readonly List<LayoutConfiguration> Layouts = new List<LayoutConfiguration>();

        const string DefaultLayoutName = "Default";

        /// <summary>
        /// Výchozí rozložení
        /// </summary>
        public static string[] DefaultLayouts = new string[] { "Default" };

        string displayName = null;

        bool readOnly;

        /// <summary>
        /// Indikuje vlastní rozložení
        /// </summary>
        public bool Custom { get; set; }

        /// <summary>
        /// Název souboru konfigurace
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// Název konfigurace
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Zobrazovací název
        /// </summary>
        public string DisplayName
        {
            get { return displayName ?? Name; }
            set { displayName = value; }
        }
        /// <summary>
        /// Indikuje stav pouze pro čtení
        /// </summary>
        public bool ReadOnly { get; set; }

        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        LayoutConfiguration()
        {
        }
        /// <summary>
        /// Vytvoření nové instance třídy
        /// </summary>
        /// <param name="el">Elemnt prezentující konfigurace</param>
        /// <param name="custom">Indikuje vlastní konfiguraci</param>
        LayoutConfiguration(XmlElement el, bool custom)
        {
            Name = el.GetAttribute("name");
            FileName = el.GetAttribute("file");
            readOnly = Boolean.Parse(el.GetAttribute("readonly"));
            Custom = custom;
        }
        /// <summary>
        /// Vytvoření vlastní konfigurace
        /// </summary>
        /// <param name="name">Název vlastní konfigurace</param>
        /// <returns></returns>
        public static LayoutConfiguration CreateCustom(string name)
        {
            LayoutConfiguration l = new LayoutConfiguration
            {
                Name = name,
                FileName = Path.GetRandomFileName() + ".xml"
            };
            File.Copy(Path.Combine(Path.Combine(PropertyService.DataDirectory, DataLayoutSubPath), "Default.xml"),
                      Path.Combine(Path.Combine(PropertyService.ConfigDirectory, "layouts"), l.FileName));
            l.Custom = true;
            Layouts.Add(l);
            return l;
        }
        /// <exclude/>
        public override string ToString()
        {
            return DisplayName;
        }

        static string currentLayoutName = DefaultLayoutName;
        /// <summary>
        /// Název aktuálního rozložení
        /// </summary>
        public static string CurrentLayoutName
        {
            get
            {
                return currentLayoutName;
            }
            set
            {
                if (ThreadService.InvokeRequired)
                    throw new InvalidOperationException(GResources.GetResourceText(29450069)); //RC 29450069 : Nutné volání!
                if (value != CurrentLayoutName)
                {
                    currentLayoutName = value;
                    SimpleDesktop.Desktop.DesktopLayout.LoadConfiguration();
                    OnLayoutChanged(EventArgs.Empty);
                }
            }
        }
        /// <summary>
        /// Opětovné načtení výchozího rozložení
        /// </summary>
        public static void ReloadDefaultLayout()
        {
            currentLayoutName = DefaultLayoutName;
            SimpleDesktop.Desktop.DesktopLayout.LoadConfiguration();
            OnLayoutChanged(EventArgs.Empty);
        }
        /// <summary>
        /// Název aktuálního souboru rozložení
        /// </summary>
        public static string CurrentLayoutFileName
        {
            get
            {
                string configPath = Path.Combine(PropertyService.ConfigDirectory, "layouts");
                LayoutConfiguration current = CurrentLayout;
                if (current != null)
                    return Path.Combine(configPath, current.FileName);
                return null;
            }
        }
        /// <summary>
        /// Název souboru šablony aktuálního rozložení
        /// </summary>
        public static string CurrentLayoutTemplateFileName
        {
            get
            {
                string dataPath = Path.Combine(PropertyService.DataDirectory, DataLayoutSubPath);
                LayoutConfiguration current = CurrentLayout;
                if (current != null)
                    return Path.Combine(dataPath, current.FileName);
                return null;
            }
        }
        /// <summary>
        /// Aktuální rozložení
        /// </summary>
        public static LayoutConfiguration CurrentLayout
        {
            get
            {
                foreach (LayoutConfiguration config in Layouts)
                    if (config.Name == CurrentLayoutName)
                        return config;
                return null;
            }
        }
        /// <summary>
        /// Získání rozložení
        /// </summary>
        /// <param name="name">Název potřebného rozložení</param>
        /// <returns></returns>
        public static LayoutConfiguration GetLayout(string name)
        {
            foreach (LayoutConfiguration config in Layouts)
                if (config.Name == name)
                    return config;
            return null;
        }

        /// <summary>
        /// Načtení konfigurace rozložení
        /// </summary>
        internal static void LoadLayoutConfiguration()
        {
            Layouts.Clear();
            string configPath = Path.Combine(PropertyService.ConfigDirectory, "layouts");
            if (File.Exists(Path.Combine(configPath, configFile)))
                LoadLayoutConfiguration(Path.Combine(configPath, configFile), true);

            string dataPath = Path.Combine(PropertyService.DataDirectory, DataLayoutSubPath);
            if (!Directory.Exists(dataPath))
                Directory.CreateDirectory(dataPath);

            if (!File.Exists(Path.Combine(dataPath, configFile)))
                ResourceService.SaveFile(typeof(FormFillerMain).Assembly, dataPath, @"^*layouts." + configFile, "layouts.");

            if (File.Exists(Path.Combine(dataPath, configFile)))
                LoadLayoutConfiguration(Path.Combine(dataPath, configFile), false);
        }

        static void LoadLayoutConfiguration(string layoutConfig, bool custom)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load(layoutConfig);

            foreach (XmlElement el in doc.DocumentElement.ChildNodes)
                Layouts.Add(new LayoutConfiguration(el, custom));
        }
        /// <summary>
        /// Uložení konfigurace vlastního rozložení
        /// </summary>
        public static void SaveCustomLayoutConfiguration()
        {
            string configPath = Path.Combine(PropertyService.ConfigDirectory, "layouts");
            using (XmlTextWriter w = new XmlTextWriter(Path.Combine(configPath, configFile), System.Text.Encoding.UTF8))
            {
                w.Formatting = Formatting.Indented;
                w.WriteStartElement("LayoutConfig");
                foreach (LayoutConfiguration lc in Layouts)
                {
                    if (lc.Custom)
                    {
                        w.WriteStartElement("Layout");
                        w.WriteAttributeString("name", lc.Name);
                        w.WriteAttributeString("file", lc.FileName);
                        w.WriteAttributeString("readonly", lc.readOnly.ToString());
                        w.WriteEndElement();
                    }
                }
                w.WriteEndElement();
            }
        }
        /// <summary>
        /// Reakce na změnu rozložení
        /// </summary>
        /// <param name="e"></param>
        protected static void OnLayoutChanged(EventArgs e)
        {
            LayoutChanged?.Invoke(null, e);
        }
        /// <summary>
        /// Volá se po změně rozložení
        /// </summary>
        public static event EventHandler LayoutChanged;
    }
}
