//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ResourceService.cs                     </Name>
//    <Description> Tato třída obsahuje dva ResourceManagers, které vážou na aplikaci specifcké zdroje řetězců a obrázků.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-13                                                  </Created>
//  </FileHeader>

using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Resources;
using System.Text.RegularExpressions;
using Gordic.General;

namespace Gordic.GFE.Parsers.Core
{
    /// <summary>
    /// Tato třída obsahuje dva ResourceManagers, které vážou na aplikaci specifcké zdroje řetězců a obrázků.
    /// </summary>
    public static class ResourceService
    {
        const string stringResources = "StringResources";
        const string imageResources = "BitmapResources";

        static string resourceDirectory;

        /// <summary>
        /// Inicializace služby ze složky zdrojů
        /// </summary>
        /// <param name="resourceDirectory">Složka zdrojů</param>
        public static void InitializeService(string resourceDirectory)
        {
            if (ResourceService.resourceDirectory != null)
            {
                LoggingService.Error(GResources.GetResourceText(29450253)); //RC 29450253 : služba zdrojů je již inicializováná!
                return;
                //throw new InvalidOperationException("Služba je již inicializovaná.");
            }
            if (string.IsNullOrEmpty(resourceDirectory))
                throw new ArgumentNullException("resourceDirectory");

            ResourceService.resourceDirectory = resourceDirectory;

            // lokální zdroje
            RegisterImages("Gordic.GFE.Parsers.Resources.BitmapResources", typeof(ResourceService).Assembly);
            RegisterImages("Gordic.GFE.Parsers.Properties.Resources", typeof(ResourceService).Assembly);
        }

        /// <summary>řetězce</summary>
        static List<ResourceManager> localStringsResMgrs = new List<ResourceManager>();
        /// <summary>obrázky</summary>
        static List<ResourceManager> localIconsResMgrs = new List<ResourceManager>();
        /// <summary>Hashtable obsahující lokální řetězce a obrázky aplikace.</summary>
        static readonly Hashtable localStrings = null;
        static readonly Hashtable localIcons = null;

        /// <summary>Seznam ResourceAssembly</summary>
        static List<ResourceAssembly> resourceAssemblies = new List<ResourceAssembly>();

        class ResourceAssembly
        {
            Assembly assembly;
            readonly string baseResourceName;
            readonly bool isIcons;

            public ResourceAssembly(Assembly assembly, string baseResourceName, bool isIcons)
            {
                this.assembly = assembly;
                this.baseResourceName = baseResourceName;
                this.isIcons = isIcons;
            }

            ResourceManager TrySatellite(string language)
            {
                string fileName = Path.GetFileNameWithoutExtension(assembly.Location) + ".resources.dll";
                fileName = Path.Combine(Path.Combine(Path.GetDirectoryName(assembly.Location), language), fileName);
                if (File.Exists(fileName))
                {
                    LoggingService.Info(string.Join(" ", GResources.GetResourceText(29450254), baseResourceName)); //RC 29450254 : Logování zdroje
                    return new ResourceManager(baseResourceName, Assembly.LoadFrom(fileName));
                }
                else
                    return null;
            }

            public void Load()
            {
                string logMessage = string.Join(" ", GResources.GetResourceText(29450256), baseResourceName + ": "); //RC 29450256 : Načtení zdorje
                ResourceManager manager = null;
                if (assembly.GetManifestResourceInfo(baseResourceName + ".resources") != null)
                {
                    LoggingService.InfoFormatted(string.Join(" ", logMessage, GResources.GetResourceText(29450255), ":{0};" + '\n' + "assembly: {1}"), baseResourceName, assembly.FullName); //RC 29450255 : načítání z hlavního sestavení
                    manager = new ResourceManager(baseResourceName, assembly);
                }
                //else if (currentLanguage.IndexOf('-') > 0
                //         && assembly.GetManifestResourceInfo(baseResourceName + ".resources") != null)
                //{
                //    LoggingService.Info(logMessage + " načítání z hlavního sestavení");
                //    manager = new ResourceManager(baseResourceName, assembly);
                //}
                //else
                //{
                //    manager = TrySatellite(currentLanguage);
                //    if (manager == null && currentLanguage.IndexOf('-') > 0)
                //        manager = TrySatellite(currentLanguage.Split('-')[0]);
                //}
                if (manager == null)
                    LoggingService.Warning(logMessage + GResources.GetResourceText(29450257)); //RC 29450257 : NENALEZENO
                else
                {
                    if (isIcons)
                    {
                        if (localIconsResMgrs.FirstOrDefault(mng => mng.BaseName.Equals(manager.BaseName, StringComparison.InvariantCultureIgnoreCase)) == null)
                            localIconsResMgrs.Add(manager);
                    }
                    else
                    {
                        if (localStringsResMgrs.FirstOrDefault(mng => mng.BaseName.Equals(manager.BaseName, StringComparison.InvariantCultureIgnoreCase)) == null)
                            localStringsResMgrs.Add(manager);
                    }
                }
                LoggingService.Info(GResources.GetResourceText(29450258)); //RC 29450258 : Načtení proběhlo úspěšně.
            }
        }

        /// <summary>
        /// Registruje zdroj řetězců ve službě zdrojů.
        /// </summary>
        /// <param name="baseResourceName">Základní název souboru prostředků vloženého do sestavení.</param>
        /// <param name="assembly">Sestavení, které obsahuje soubor prostředků.</param>
        public static void RegisterStrings(string baseResourceName, Assembly assembly)
        {
            RegisterNeutralStrings(new ResourceManager(baseResourceName, assembly));
            ResourceAssembly ra = new ResourceAssembly(assembly, baseResourceName, false);
            resourceAssemblies.Add(ra);
            ra.Load();
        }

        /// <summary>
        /// Registrace specifických řetězců
        /// </summary>
        /// <param name="stringManager">Manažer specifického zdroje řetězců</param>
        public static void RegisterNeutralStrings(ResourceManager stringManager)
        {
            localStringsResMgrs.Add(stringManager);
        }

        /// <summary>
        /// Registruje zdroj obrázků ve službě zdrojů.
        /// </summary>
        /// <param name="baseResourceName">Základní název souboru prostředků vloženého do sestavení.</param>
        /// <param name="assembly">Sestavení, které obsahuje soubor prostředků.</param>
        public static void RegisterImages(string baseResourceName, Assembly assembly)
        {
            RegisterNeutralImages(new ResourceManager(baseResourceName, assembly));
            ResourceAssembly ra = new ResourceAssembly(assembly, baseResourceName, true);
            resourceAssemblies.Add(ra);
            ra.Load();
        }

        /// <summary>
        /// Registrace specifických obrázků
        /// </summary>
        /// <param name="imageManager">Manager specifického zdroje obrázků</param>
        public static void RegisterNeutralImages(ResourceManager imageManager)
        {
            localIconsResMgrs.Add(imageManager);
        }


        static Hashtable Load(string fileName)
        {
            if (File.Exists(fileName))
            {
                Hashtable resources = new Hashtable();
                ResourceReader rr = new ResourceReader(fileName);
                foreach (DictionaryEntry entry in rr)
                    resources.Add(entry.Key, entry.Value);
                rr.Close();
                return resources;
            }
            return null;
            //Assembly exe = typeof(ResourceService).Assembly;

            //Hashtable resources = new Hashtable();
            //ResourceReader rr = new ResourceReader(exe.GetManifestResourceStream(fileName));
            //foreach (DictionaryEntry entry in rr)
            //    resources.Add(entry.Key, entry.Value);
            //rr.Close();
            //return resources;
        }

        /// <summary>
        /// Vrátí řetězec z databáze prostředků.
        /// </summary>
        /// <returns>
        /// Řetězec z databáze prostředků.
        /// </returns>
        /// <param name="name"> Název řetězce.</param>
        /// <exception cref="ResourceNotFoundException">
        /// Vyvolá se pokud správce GlobalResource nemůže najít poptávaný prostředek.
        /// </exception>
        public static string GetString(string name)
        {
            if (localStrings != null && localStrings[name] != null)
                return localStrings[name].ToString();

            string s = null;
            foreach (ResourceManager resourceManger in localStringsResMgrs)
                try
                {
                    s = resourceManger.GetString(name);
                    if (s != null)
                        break;
                }
                catch (Exception) { }

            if (s == null)
                throw new ResourceNotFoundException(GResources.GetResourceText(29450259) + " >" + name + "<"); //RC 29450259 : řetězec

            return s;
        }

        /// <summary>
        /// Vrácí obrázek z databáze prostředků.
        /// </summary>
        /// <returns>
        /// Obrázek z databáze prostředků
        /// </returns>
        /// <param name="name">Název obrázku.</param>
        public static object GetImageResource(string name)
        {
            object iconobj = null;

            if (localIcons != null && localIcons[name] != null)
                iconobj = localIcons[name];
            else
                foreach (ResourceManager resourceManger in localIconsResMgrs)
                {
                    try { iconobj = resourceManger.GetObject(name); }
                    catch { }
                    if (iconobj != null)
                        break;
                }
            return iconobj;
        }


        /// <summary>
        /// Uložení na disk všech souborů ze zdojů odpovídajících masce.
        /// Nevytváří složky!!!
        /// </summary>
        /// <param name="exe">Sestavení se zdrojem</param>
        /// <param name="dataPath">Složka do které se soubory budou ukládat</param>
        /// <param name="resourceFileMask">maska</param>
        /// <param name="maskPredicate">vše, co je zapotřebí odstranit z masky aby vznikl krátky název souboru</param>
        public static void SaveFile(Assembly exe, string dataPath, string resourceFileMask, string maskPredicate)
        {
            string[] manifestResourceNames = exe.GetManifestResourceNames();
            bool later = false;

            Regex reg = new Regex(resourceFileMask);
            foreach (string item in manifestResourceNames)
                if (reg.IsMatch(item))
                {
                    later = false;
                    string resValue = Regex.Match(item, resourceFileMask).Value.Remove(0, maskPredicate.Length);
                    string fileName = Path.Combine(dataPath, resValue);
                    string description = string.Empty;
                    if (File.Exists(fileName))
                        using (FileStream fileStream = File.OpenRead(fileName))
                            if (FileUtility.LaterVersion(exe.GetManifestResourceStream(item), fileStream, ref description))
                            {
                                LoggingService.InfoFormatted(GResources.GetResourceText(29450261) + " '{0}' " + GResources.GetResourceText(29450260), string.IsNullOrEmpty(description) ? item.Replace(exe.GetName().Name + ".", string.Empty) : description); //RC 29450261 : aktualizace nastavení
                                later = true;
                            }
                    if (later)
                        try { File.Delete(fileName); }
                        catch { LoggingService.Error(GResources.GetResourceText(29450262)); } //RC 29450262 : Chyba nahrazení souboru nastavení!

                    if (!File.Exists(fileName))
                        using (Stream stream = File.Create(fileName))
                            CopyStream(exe.GetManifestResourceStream(item), stream);
                }
        }

        /// <summary> 
        /// Kopírování obsahu vstupu do výstupu. 
        /// Neuzavírá datový proud. 
        /// </summary> 
        static void CopyStream(Stream input, Stream output)
        {
            byte[] buffer = new byte[input.Length];
            int len;
            while ((len = input.Read(buffer, 0, buffer.Length)) > 0)
                output.Write(buffer, 0, len);
        }
    }
}
