//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.PropertiesService.cs                     </Name>
//    <Description> Služba práci s vlastnostmi                                  </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-11                                                  </Created>
//  </FileHeader>

using System;
using System.Linq;
using System.Text;
using Gordic.General;
using System.IO;
using System.Xml;
using System.Threading;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Služba práci s vlastnostmi
    /// </summary>
    public static class PropertyService
    {
        static string propertyFileName;
        static string propertyXmlRootNodeName;
        static string configDirectory;
        static string dataDirectory;
        static Property properties;

        /// <summary>
        /// Složka s resources
        /// </summary>
        public static string ConfigDirectory
        {
            get { return configDirectory; }
            private set { configDirectory = value; FileUtility.GetOrCreateDirectory(value); }
        }

        /// <summary>
        /// Složka s resources
        /// </summary>
        public static string DataDirectory 
        { 
            get { return dataDirectory; }
            private set { dataDirectory = value; FileUtility.GetOrCreateDirectory(value); }
        }

        /// <summary>
        /// Inicializace služby
        /// </summary>
        /// <param name="configDirectory">Složka konfiguračních souborů</param>
        /// <param name="dataDirectory">Složka datových souborů</param>
        /// <param name="propertiesName">Název souboru vlastnosti</param>
        public static void InitializeService(string configDirectory, string dataDirectory, string propertiesName)
        {
            if (properties != null)
            {
                LoggingService.Info(GResources.GetResourceText(29450015));
                return;
                //throw new InvalidOperationException(GResources.GetResourceText(29450015)); //RC 29450015 : Služba je již inicializována.
            }
            if (configDirectory == null || dataDirectory == null || propertiesName == null)
                throw new ArgumentNullException();
            properties = new Property();
            PropertyService.ConfigDirectory = configDirectory;
            PropertyService.DataDirectory = dataDirectory;
            propertyXmlRootNodeName = propertiesName;
            propertyFileName = propertiesName + ".xml";
            properties.PropertyChanged += new PropertyChangedEventHandler(PropertiesPropertyChanged);
        }

        /// <summary>
        /// Načtení konfigurace
        /// </summary>
        public static void Load()
        {
            if (properties == null)
                throw new InvalidOperationException(GResources.GetResourceText(29450016)); //RC 29450016 : Službu se nepodařilo inicializovat.

            if (!Directory.Exists(configDirectory))
                CopyOrCreate(configDirectory);

            if (!LoadPropertiesFromStream(Path.Combine(configDirectory, propertyFileName)))
            {
                if (!Directory.Exists(DataDirectory))
                    CopyOrCreate(DataDirectory);

                LoadPropertiesFromStream(Combine(DataDirectory, "options", propertyFileName));
            }
        }
        static DirectoryInfo oldConfig = null;
        static void CopyOrCreate(string newDirectory)
        {
            if (!Directory.Exists(newDirectory))
                Directory.CreateDirectory(newDirectory);

            // kopírování starého nastavení
            try
            {
                if (oldConfig == null)
                {
                    DirectoryInfo dir = new DirectoryInfo(Path.GetDirectoryName(newDirectory));
                    if (int.TryParse(dir.Name.Split('.').Last(), out int index))
                        while (index >= 0)
                        {
                            index--;
                            foreach (var item in dir.Parent.GetDirectories())
                                if (item.Name.Split('.').Last().Equals(index.ToString(), StringComparison.InvariantCultureIgnoreCase))
                                {
                                    oldConfig = item;
                                    break;
                                }
                            if (oldConfig != null)
                                break;
                            else index--;
                        }
                }

                if (oldConfig != null)
                    if (Directory.Exists(Path.Combine(oldConfig.FullName, Path.GetFileName(newDirectory))))
                        FileUtility.DeepCopy(Path.Combine(oldConfig.FullName, Path.GetFileName(newDirectory)),
                            newDirectory, false);
            }
            catch { }
        }

        static string Combine(params string[] paths)
        {
            if (paths == null || paths.Length == 0)
                return String.Empty;

            string result = paths[0];
            for (int i = 1; i < paths.Length; i++)
                result = Path.Combine(result, paths[i]);

            return result;
        }
        /// <exclude/>
        public static bool LoadPropertiesFromStream(string fileName)
        {
            if (!File.Exists(fileName))
                return false;

            try
            {
                using (LockPropertyFile())
                using (XmlTextReader reader = new XmlTextReader(fileName))
                    while (reader.Read())
                        if (reader.IsStartElement())
                            if (reader.LocalName == propertyXmlRootNodeName)
                            {
                                properties.ReadProperties(reader, propertyXmlRootNodeName);
                                return true;
                            }
            }
            catch (XmlException ex)
            {
                MessageService.ShowError(GResources.GetResourceText(29450017) + ex.Message + GResources.GetResourceText(29450018)); //RC 29450018 : ;Nastavení byly obnoveny na výchozí hodnoty.
            }
            return false;
        }

        /// <summary>
        /// Uzamykání vlastnosti souboru tak, aby soubor byl bezpečně otevřen
        /// </summary>
        public static IDisposable LockPropertyFile()
        {
            Mutex mutex = new Mutex(false, "Mutex-EC1AFE8C-4121-11E1-A216-02D24724019B");
            mutex.WaitOne();
            return new CallbackOnDispose(
                delegate
                {
                    mutex.ReleaseMutex();
                    mutex.Close();
                });
        }

        /// <summary>
        /// Získání vlastnosti
        /// </summary>
        /// <typeparam name="T">Typ vracené hodnoty</typeparam>
        /// <param name="property">Vlastnost</param>
        /// <param name="defaultValue">Implicitní hodnota vlastnosti</param>
        /// <returns></returns>
        public static T Get<T>(string property, T defaultValue)
        {
            return properties.Get(property, defaultValue);
        }

        /// <summary>
        /// Uložení vlastnosti
        /// </summary>
        /// <typeparam name="T">Typ ukládané vlastnosti</typeparam>
        /// <param name="property">Vlastnost</param>
        /// <param name="value">Hodnota vlastnosti</param>
        public static void Set<T>(string property, T value)
        {
            properties.Set(property, value);
        }

        static void PropertiesPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            PropertyChanged?.Invoke(null, e);
        }

        /// <summary>
        /// Uložení nastavení
        /// </summary>
        public static void Save()
        {
            using (MemoryStream ms = new MemoryStream())
            {
                XmlTextWriter writer = new XmlTextWriter(ms, Encoding.UTF8)
                {
                    Formatting = Formatting.Indented
                };
                writer.WriteStartElement(propertyXmlRootNodeName);
                properties.WriteProperties(writer);
                writer.WriteEndElement();
                writer.Flush();

                ms.Position = 0;
                string fileName = Path.Combine(configDirectory, propertyFileName);
                using (LockPropertyFile())
                using (FileStream fs = new FileStream(fileName, FileMode.Create, FileAccess.Write, FileShare.None))
                    ms.WriteTo(fs);
            }
        }

        /// <summary>
        /// Zavolá se po změně vlastnosti
        /// </summary>
        public static event PropertyChangedEventHandler PropertyChanged;

        /// <summary>
        /// Uvolnění služby vlastnosti
        /// </summary>
        public static void Unload()
        {
            Save();
        }

        /// <summary>
        /// Uložení konfigurační hodnoty
        /// </summary>
        /// <param name="key">klíč ukládané hodnoty</param>
        /// <param name="prop">Hodnota uložení</param>
        public static void SetConfigMemento(string key, Property prop)
        {
            string fName = Path.Combine(PropertyService.ConfigDirectory, "config.xml");
            Property pp = Property.Load(fName) ?? new Property();
            pp.Set(key, prop);
            FileUtility.ObservedSave(new NamedFileOperationDelegate(pp.Save), fName, FileErrorPolicy.Inform, false);
        }

        /// <summary>
        /// Uložení konfigurační hodnoty
        /// </summary>
        /// <param name="key">Název souboru k uložení hodnoty</param>
        /// <typeparam name="T">Typ vracené hodnoty</typeparam>
        /// <param name="deffValue">Implicitní hodnota vlastnosti</param>
        /// <returns></returns>
        public static T GetConfigMemento<T>(string key, T deffValue)
        {
            Property pp = Property.Load(Path.Combine(PropertyService.ConfigDirectory, "config.xml")) ?? new Property();
            return pp.Get(key, deffValue);
        }
    }

    /// <summary>
    /// Zpětné volání po uvolnění třídy
    /// </summary>
    sealed class CallbackOnDispose : IDisposable
    {
        System.Action callback;

        /// <exclude/>
        public CallbackOnDispose(System.Action callback)
        {
            this.callback = callback ?? throw new ArgumentNullException("callback");
        }

        /// <summary>
        /// Uvolnění objektu
        /// </summary>
        public void Dispose()
        {
            Interlocked.Exchange(ref callback, null)?.Invoke();
        }
    }

}
