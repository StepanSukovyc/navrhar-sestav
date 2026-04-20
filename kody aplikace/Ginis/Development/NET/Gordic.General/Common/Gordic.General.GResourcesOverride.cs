//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.General.GResourcesOverride.cs                        </Name>
//    <Description> třída pro přetížení resource                                </Description>
//    <Author>      Martin Aliger                                               </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993 - 2021                            </Copyright>
//    <Created>     2015-07-13                                                  </Created>
//  </FileHeader>

using System;
using System.IO;
using System.Collections;
using System.Reflection;
using System.Resources;
using System.Runtime.CompilerServices;
using System.Diagnostics;
using System.Collections.Generic;

namespace Gordic.General {

    /// <summary>ID konkrétního resource</summary>
    [System.Security.SecuritySafeCritical]
    public struct GResourceId
    {
        /// <summary>kód</summary>
        public readonly string ResourceCode;
        /// <summary>rozlišující název</summary>
        public readonly string ExtendedFileName;
        /// <summary>assembly</summary>
        public readonly Assembly Assembly;
        /// <summary>ID konkrétního resource</summary>
        public GResourceId(string resourceCode, string extendedFileName, Assembly assembly)
        {
            this.ResourceCode = resourceCode;
            this.ExtendedFileName = extendedFileName;
            this.Assembly = assembly;
        }

        /// <summary>získání správce zdrojů</summary>
        public ResourceManager GetResourceManager()
        {
            return GResources.GetResourceManager(ExtendedFileName, Assembly);
        }
        /// <summary>získání objektu ze zdrojů</summary>
        public object GetValue()
        {
            return GetResourceManager().GetObject(ResourceCode);
        }

        /// <summary>Plné jméno</summary>
        public string ResourceFullName
        {
            get
            {
                return Assembly.GetName().Name + "/" + ExtendedFileName + "/" + ResourceCode;
            }
        }
        /// <summary>Zkratka</summary>
        public string ResourceShortcut
        {
            get
            {
                return GetShortAssemblyName(Assembly) + GetShortExt(ExtendedFileName, Assembly) + GetShortCode(ResourceCode);
            }
        }

        ///// <summary>Seznam zkratek assembly</summary>
        //public static Dictionary<string, string> AssemblyShortcuts = new Dictionary<string, string>()
        //{
        //    {"Gordic.General","g"},
        //    {"Gordic.General.ApplicationInterface","gi"},
        //    {"Gordic.General.ApplicationClient","gc"},
        //    {"Gordic.General.ApplicationServer","gs"},
        //    {"Gordic.General.WebService","gws"},

        //    {"Gordic.Gui", "G"},
        //    {"Gordic.General.WinApplication","gW"},
        //    {"Gordic.WinForms.Controls", "Wc"},
        //    {"Gordic.WinForms.DbControls", "Wd"},
        //    {"Gordic.WinForms.Gui", "WG"},

        //    {"Gordic.General.WebApplication","gw"},
        //    {"Gordic.Gui.WebControls", "wc"},
        //    {"Gordic.WebUI.Gui", "wG"},
        //};


        /// <summary>
        /// Přístup k slovníku assembly skutečně uplatněných při lokalizaci - tedy nejen zaregistrovaných autorem
        /// FFIALA - 2017-08-25
        /// </summary>
        public static IReadOnlyDictionary<string, System.Reflection.Assembly> RealAssemblyShortcuts
        {
            get { return _RealAssemblyShortcuts; }
        }

        /// <summary>
        /// Přístup ke slovníku zkratek přiřazených k jednotlivým assembly. S pomocí této property má koncový autor možnost vypsat např. do debug výstupu jednotlivé přiřazení zkratky - jinak k této informaci nebyla cesta
        /// FFIALA - 2017-08-25
        /// </summary>
        public static IReadOnlyDictionary<string, string> AssemblyShortcuts
        {
            get { return _AssemblyShortcuts; }
        }

        /// <summary>
        /// Slovník skutečných assembly - asi je potřeba pouze pro zpětný převod ze zkratky na Assembly
        /// </summary>
        private static Dictionary<string, System.Reflection.Assembly> _RealAssemblyShortcuts = new Dictionary<string, System.Reflection.Assembly >();

        /// <summary>
        /// Slovník jmen assembly a k nim přiřazených zkratek
        /// </summary>
        private static Dictionary<string, string> _AssemblyShortcuts = new Dictionary<string, string>( );

        /// <summary>Reset. Nepoužívat!</summary>
        public static void Reset() { ShortGenerator.Reset(); _AssemblyShortcuts.Clear(); _RealAssemblyShortcuts.Clear(); }

        /// <summary>
        /// Generování zkrácených jmen knihoven
        /// </summary>
        public static class ShortGenerator
        {
            private static System.Text.StringBuilder m_sNextShort = new System.Text.StringBuilder("a");
            /// <summary>Reset generátoru. Nepoužívat!</summary>
            public static void Reset() { m_sNextShort = new System.Text.StringBuilder("a"); }
            /// <summary>
            /// Generování zkrácených jmen knihoven
            /// </summary>
            public static string Next()
            {
                var l_next = m_sNextShort.ToString();
                int l = m_sNextShort.Length;
                while (true)
                {
                    l--;
                    if (l < 0)
                    {
                        m_sNextShort.Insert(0, 'a');
                        break;
                    }
                    char c = m_sNextShort[l];
                    if (c < 'z') { m_sNextShort[l] = (char)((int)c + 1); break; }
                    m_sNextShort[l] = 'a';
                }
                return l_next;
            }
        }

        /// <summary>Zkrácení assembly</summary>
        public static string GetShortAssemblyName(System.Reflection.Assembly assembly)
        {
            string shortname;
            //var name = assembly.GetName().Name;
            //if (AssemblyShortcuts.TryGetValue(name, out shortname)) return shortname;
            //return name;

            if(!_RealAssemblyShortcuts.ContainsKey( assembly.GetName( ).Name ))
                _RealAssemblyShortcuts.Add( assembly.GetName( ).Name, assembly );

            if(_AssemblyShortcuts.TryGetValue(assembly.GetName().Name, out shortname))
                return shortname;

            var id = ShortGenerator.Next();
            _AssemblyShortcuts.Add( assembly.GetName( ).Name, id);
            return id;

        }

        /// <summary>
        /// Do slovníku zkrácených názvů assembly zaregistruje zadanou asswembly pod zadaným názvem - tím umožní autorům, aby konkrétní assembly přiřadily jednoznačně jimi zvolenou zkratku.
        /// Zvolená zkratka by měla být výrazně jiná než generovaná posloupnost. Ta je od 'a' až po 'z' a pokud to nestačí, potom 'aa' až 'az'
        /// Takže je vhodné volit zkratky např. '#a' az '#z' nebo pouze velké písmena
        /// Pokud je assembly již registrovaná, potom to vyhodí chybu
        /// FFIALA - 2017-08-25
        /// </summary>
        /// <param name="assembly">Assembly, která se má zaregistrovat</param>
        /// <param name="shortname">přiřazená zkratka</param>
        public static void RegistryAssemblyName( System.Reflection.Assembly assembly, string shortname )
        {
            if(_AssemblyShortcuts.TryGetValue( assembly.GetName( ).Name, out string orig_shortname ))
            {
                if(orig_shortname != shortname)
                    throw new GException( 21300001, 21350002, orig_shortname ); //RC-EX 21350002 : Interní chyba aplikace. K assembly je již přiřazena jiná zkratka: '{0}'
            }
            else
                _AssemblyShortcuts.Add( assembly.GetName( ).Name, shortname );


            if(!_RealAssemblyShortcuts.ContainsKey( assembly.GetName( ).Name ))
                _RealAssemblyShortcuts.Add( assembly.GetName( ).Name, assembly );

        }

        /// <summary>
        /// Do slovníku zkrácených názvů assembly zaregistruje zadanou asswembly pod zadaným názvem - tím umožní autorům, aby konkrétní assembly přiřadily jednoznačně jimi zvolenou zkratku.
        /// Zvolená zkratka by měla být výrazně jiná než generovaná posloupnost. Ta je od 'a' až po 'z' a pokud to nestačí, potom 'aa' až 'az'
        /// Takže je vhodné volit zkratky např. '#a' az '#z' nebo pouze velké písmena
        /// Pokud je assembly již registrovaná, potom ji přeregistruje
        /// FFIALA - 2017-08-25
        /// </summary>
        /// <param name="assembly">Assembly, která se má zaregistrovat</param>
        /// <param name="shortname">přiřazená zkratka</param>
        public static void RegistryAssemblyName( string assembly, string shortname )
        {
            if(_AssemblyShortcuts.TryGetValue( assembly, out string orig_shortname ))
            {
                _AssemblyShortcuts[assembly] = shortname;
                //if(orig_shortname != shortname)
                //    throw new GException( 21300001, 21350002, orig_shortname ); //RC-EX 21350002 : Interní chyba aplikace. K assembly je již přiřazena jiná zkratka: '{0}'
            }
            else
                _AssemblyShortcuts.Add( assembly, shortname );
        }

        /// <summary>Zkrácení rozlišujícího názvu</summary>
        public static string GetShortExt(string extendedFileName, System.Reflection.Assembly assembly)
        {
            if (extendedFileName == "Exceptions") return "E";
            return extendedFileName;
        }
        private static string GetShortCode(string resourceCode)
        {
            if (Char.IsLetter(resourceCode, 0)) return '/' + resourceCode;
            return resourceCode;
        }

        /// <summary>Zpětný překlad zkratky na plné jméno resource</summary>
        public static GResourceId FromShortCut( string shortCut )
        {
            int i = 0;
            while(!char.IsNumber( shortCut, i ) && shortCut[i] != '/')
                i++;
            var ashort = shortCut.Substring( 0, i );

            int s = i;
            while(char.IsLetter( shortCut, i ))
                i++;
            var ext = shortCut.Substring( s, i - s );
            if(ext == "E")
                ext = "Exceptions";

            if(shortCut[i] == '/')
                i++;
            var code = shortCut.Substring( i );

            foreach(var kv in _AssemblyShortcuts)
            {
                if(kv.Value == ashort && _RealAssemblyShortcuts.ContainsKey( kv.Key ) )
                    return new GResourceId( code, ext, _RealAssemblyShortcuts[kv.Key] );
            }
            throw new GException( 21000023, 21090022 ); //RC-EX 21090022 : Zkratka nelze dohledat
        }

    }

    /// <summary>třída pro přetížení resource</summary>
    [System.Security.SecuritySafeCritical]
    public abstract class GResourcesOverride
    {
        /// <summary>získání objektu ze zdrojů</summary>
        public abstract object GetResourceObject(GResourceId id);
    }
    /// <summary>třída pro přetížení resource</summary>
    [System.Security.SecuritySafeCritical]
    public class GResourcesOverrideFile : GResourcesOverride
    {
        private string m_FileName;
        /// <summary>třída pro přetížení resource</summary>
        public GResourcesOverrideFile(string fileName)
        {
            m_FileName = fileName;
        }

        private FileSystemWatcher m_watcher = null;
        private void Open()
        {
            try
            {
                using (var sr = File.OpenText(m_FileName))
                {
                    m_dict = new Dictionary<string, string>();
                    while (true)
                    {
                        var l = sr.ReadLine();
                        if (l == null) break;
                        var s = l.Split(new char[] { '=' }, 2);
                        if (s.Length != 2) continue;
                        m_dict.Add(s[0], s[1]);
                    }
                }
            }

            catch (IOException) { }
            if (m_watcher == null)
            {
                m_watcher = new FileSystemWatcher(Path.GetDirectoryName(m_FileName), Path.GetFileName(m_FileName));
                m_watcher.Changed += GResourcesOverrideFile_Changed;
                //m_watcher.NotifyFilter = NotifyFilters.
                m_watcher.EnableRaisingEvents = true;
            }
        }

        void GResourcesOverrideFile_Changed(object sender, FileSystemEventArgs e)
        {
            m_dict = null;
        }

        private Dictionary<string, string> m_dict = null;

        /// <summary>získání objektu ze zdrojů</summary>
        [System.Security.SecuritySafeCritical]
        public override object GetResourceObject(GResourceId id)
        {
            
            if (m_dict == null && m_FileName != null)
                Open();

            if (m_dict != null)
            {
                string value;
                if (m_dict.TryGetValue(id.ResourceFullName, out value))
                    return value;
                if (m_dict.TryGetValue(id.ResourceShortcut, out value))         // F.Fiala - umožníme i zkrácený zápis a hledání podle něj. Tedy zkratka assemby + číselný kód, nebo zkratka assembly / textový kód
                    return value;
            }
            return null;
        }

        /// <summary>Ruční nastavení konkrétní hodnoty a její zápis do override souboru</summary>
        public void SetResourceString(GResourceId id, string value)
        {
            if (m_dict == null && m_FileName != null) Open();
            if (m_dict == null)
                m_dict = new Dictionary<string, string>();
            m_dict.Remove(id.ResourceShortcut);
            if (value == null)
                m_dict.Remove(id.ResourceFullName);
            else
                m_dict[id.ResourceFullName] = value;

            if (m_FileName != null)
            {
                if (m_watcher != null) m_watcher.EnableRaisingEvents = false;
                try
                {
                    using (StreamWriter sw = new StreamWriter(m_FileName))
                    {
                        foreach (var kv in m_dict)
                        {
                            sw.Write(kv.Key);
                            sw.Write('=');
                            sw.WriteLine(kv.Value);
                        }
                    }
                }
                finally
                {
                    if (m_watcher != null) m_watcher.EnableRaisingEvents = true;
                }
            }
        }
    }
    /// <summary>třída pro přetížení resource</summary>
    [System.Security.SecuritySafeCritical]
    public class GResourcesOverrideIds : GResourcesOverride
    {
        /// <summary>získání objektu ze zdrojů</summary>
        [System.Security.SecuritySafeCritical]
        public override object GetResourceObject(GResourceId id)
        {
            return id.ResourceShortcut;
        }
    }

} // end namespace
