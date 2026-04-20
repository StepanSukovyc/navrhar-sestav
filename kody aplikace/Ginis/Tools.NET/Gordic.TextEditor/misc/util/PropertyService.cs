// <file>
//     <copyright see="prj:///doc/copyright.txt"/>
//     <license see="prj:///doc/license.txt"/>
//     <owner name="Mike Krüger" email="mike@icsharpcode.net"/>
//     <version>$Revision$</version>
// </file>

using System;
using System.IO;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using System.Xml;

namespace Gordic.TextEditor.Misc.Util
{
    public static class PropertyService
    {
        static string propertyFileName;
        static string propertyXmlRootNodeName;

        static string configDirectory;
        static string dataDirectory;

        static Properties properties;

        public static bool Initialized
        {
            get
            {
                return properties != null;
            }
        }

        public static void InitializeService(string configDirectory, string dataDirectory, string propertiesName)
        {
            if (properties != null)
                throw new InvalidOperationException("Service is already initialized.");
            //if (configDirectory == null || dataDirectory == null || propertiesName == null)
            //    throw new ArgumentNullException();
            properties = new Properties();
            PropertyService.configDirectory = configDirectory;
            PropertyService.dataDirectory = dataDirectory;
            propertyXmlRootNodeName = propertiesName;
            propertyFileName = propertiesName + ".xml";
            properties.PropertyChanged += new PropertyChangedEventHandler(PropertiesPropertyChanged);
            Load();
        }

        public static string ConfigDirectory
        {
            get
            {
                return configDirectory;
            }
        }

        public static string DataDirectory
        {
            get
            {
                return dataDirectory;
            }
        }

        public static string Get(string property)
        {
            return properties[property];
        }

        public static T Get<T>(string property, T defaultValue)
        {
            return properties.Get(property, defaultValue);
        }

        public static void Set<T>(string property, T value)
        {
            properties.Set(property, value);
        }

        public static void Load()
        {
            if (properties == null)
                throw new InvalidOperationException("Service is not initialized.");

            if (string.IsNullOrEmpty(configDirectory) || string.IsNullOrEmpty(propertyFileName))
                return;

            if (!Directory.Exists(configDirectory))
                Directory.CreateDirectory(configDirectory);

            if (!LoadPropertiesFromStream(Path.Combine(configDirectory, propertyFileName)))
                LoadPropertiesFromStream(Combine(DataDirectory, "options", propertyFileName));
        }

        public static string Combine(params string[] paths)
        {
            if (paths == null || paths.Length == 0)
                return String.Empty;

            string result = paths[0];
            for (int i = 1; i < paths.Length; i++)
                result = Path.Combine(result, paths[i]);
            return result;
        }

        public static bool LoadPropertiesFromStream(string fileName)
        {
            if (!File.Exists(fileName))
                return false;
            try
            {
                using (LockPropertyFile())
                {
                    using (XmlTextReader reader = new XmlTextReader(fileName))
                    {
                        while (reader.Read())
                        {
                            if (reader.IsStartElement())
                            {
                                if (reader.LocalName == propertyXmlRootNodeName)
                                {
                                    properties.ReadProperties(reader, propertyXmlRootNodeName);
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
            catch (XmlException ex)
            {
                MessageBox.Show("Error loading properties: " + ex.Message + "\nSettings have been restored to default values.");
            }
            return false;
        }

        public static void Save()
        {
            if (!string.IsNullOrEmpty(configDirectory) && Directory.Exists(configDirectory)
                && !string.IsNullOrEmpty(propertyFileName))
                using (MemoryStream ms = new MemoryStream())
                {
                    XmlTextWriter writer = new XmlTextWriter(ms, Encoding.UTF8);
                    writer.Formatting = Formatting.Indented;
                    writer.WriteStartElement(propertyXmlRootNodeName);
                    properties.WriteProperties(writer);
                    writer.WriteEndElement();
                    writer.Flush();

                    ms.Position = 0;
                    string fileName = Path.Combine(configDirectory, propertyFileName);
                    using (LockPropertyFile())
                    {
                        using (FileStream fs = new FileStream(fileName, FileMode.Create, FileAccess.Write, FileShare.None))
                        {
                            ms.WriteTo(fs);
                        }
                    }
                }
        }

        /// <summary>
        /// Acquires an exclusive lock on the properties file so that it can be opened safely.
        /// </summary>
        public static IDisposable LockPropertyFile()
        {
            Mutex mutex = new Mutex(false, "PropertyServiceSave-51E488DA-1946-11E2-9FD3-06726188709B");
            mutex.WaitOne();
            return new CallbackOnDispose(
                delegate
                {
                    mutex.ReleaseMutex();
                    mutex.Close();
                });
        }

        static void PropertiesPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            if (PropertyChanged != null)
                PropertyChanged(null, e);
        }

        public static event PropertyChangedEventHandler PropertyChanged;
    }

    /// <summary>
    /// Invokes a callback when this class is dispsed.
    /// </summary>
    sealed class CallbackOnDispose : IDisposable
    {
        // TODO: in 4.0, use System.Action and make this class public
        System.Threading.ThreadStart callback;

        public CallbackOnDispose(System.Threading.ThreadStart callback)
        {
            if (callback == null)
                throw new ArgumentNullException("callback");
            this.callback = callback;
        }

        public void Dispose()
        {
            System.Threading.ThreadStart action = Interlocked.Exchange(ref callback, null);
            if (action != null)
                action();
        }
    }

}
