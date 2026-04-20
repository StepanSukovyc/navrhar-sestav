//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.RecentOpen.cs                            </Name>
//    <Description> Naposledy otevřené soubory/projekty                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-04-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using Gordic.General;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Services;

namespace Gordic.GFE.Parsers.Utils
{
    /// <summary>
    /// typy naposled zotevřených souborů
    /// </summary>
    public enum RecentOpenFileType
    {
        /// <summary>
        /// databázový soubor
        /// </summary>
        database,
        /// <summary>
        /// soubor na disku
        /// </summary>
        file,
        /// <summary>
        /// projektový soubor
        /// </summary>
        project
    }
    /// <summary>
    /// naposledy otevřený soubor
    /// </summary>
    public sealed class RecentOpenFile
    {
        /// <summary>
        /// vlastnost objektu
        /// </summary>
        private Property property;
        /// <summary>
        /// název (cesta k souboru) souboru
        /// </summary>
        public string Path { get { return property["path"]; } set { property["path"] = value; } }
        /// <summary>
        /// zobrazovací název souboru.
        /// uživatel si může soubor pojmenovat víceméně jak se mu zlíbí
        /// </summary>
        public string DisplayName { get { return property.Get("displayname", Path); } set { property.Set("displayname", value); } }
        /// <summary>
        /// indikuje, že soubor je soubor databáze
        /// </summary>
        public bool IsDatabaseFile
        {
            get { return property.Get("database", false); }
            set
            {
                property.Set("database", value);
                if (value) Type = RecentOpenFileType.database;
            }
        }
        /// <summary>
        /// typ souboru
        /// </summary>
        public RecentOpenFileType Type { get { return property.Get("type", RecentOpenFileType.file); } set { property.Set("type", value); } }
        /// <summary>
        /// typ souboru
        /// </summary>
        public string Formation { get { return property["formation"]; } set { property["formation"] = value; } }
        /// <summary>
        /// typ souboru
        /// </summary>
        public string IXSALV { get { return property["ixsalv"]; } set { property["ixsalv"] = value; } }
        /// <summary>
        /// typ souboru
        /// </summary>
        public string IXSFRM { get { return property["ixsfrm"]; } set { property["ixsfrm"] = value; } }
        /// <summary>
        /// prefix databázového souboru
        /// </summary>
        public string Prefix { get { return property["prefix"]; } set { property["prefix"] = value; } }

        /// <summary>
        /// vytvoření nové instance třídy
        /// </summary>
        /// <param name="path">cesta k souboru</param>
        public RecentOpenFile(string path)
        {
            property = new Property();
            Path= path;
            //if (FileUtility.TestFileExists(path))
            //    DisplayName = System.IO.Path.GetFileName(path);
            DisplayName = path;
        }

        /// <summary>
        /// vytvořenínové instance třídy dle vlastnosti
        /// </summary>
        /// <param name="property">vlastnost objektu</param>
        public RecentOpenFile(Property property)
        {
            // TODO: Complete member initialization
            this.property = property;
        }

        /// <summary>
        /// konstruktor třídy
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="isDatabase"></param>
        /// <param name="l_ixsalv"></param>
        /// <param name="l_ixsfrm"></param>
        /// <param name="prefix"></param>
        public RecentOpenFile(string fileName, bool isDatabase, string l_ixsalv, string l_ixsfrm, string prefix = null)
        {
            property = new Property();
            IsDatabaseFile = isDatabase;
            if (isDatabase)
            {
                Path = fileName;
                if (FileUtility.TestFileExists(fileName))
                    DisplayName = string.Format("DB{0}: {1}", !string.IsNullOrEmpty(prefix) ? " " + prefix : string.Empty, System.IO.Path.GetFileName(fileName));
                if (!string.IsNullOrEmpty(l_ixsalv))
                    IXSALV = l_ixsalv;
                if (!string.IsNullOrEmpty(l_ixsfrm))
                    IXSFRM = l_ixsfrm;
                if (!string.IsNullOrEmpty(prefix))
                    Prefix = prefix;
            }
        }

        /// <summary>
        /// získání objektu z vlastnosti
        /// </summary>
        /// <param name="property">vlastnost objektu</param>
        /// <returns></returns>
        internal static RecentOpenFile FromProperty(Property property) { return new RecentOpenFile(property); }

        /// <summary>
        /// převod objektu na vlastnost
        /// </summary>
        /// <returns></returns>
        internal Property ToProperty() { return property; }

        /// <exclude/>
        public void Set<T>(string prop, T value)
        {
            if (prop == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450028)); //RC 29450028 : Vlastnost je NULL

            if (value == null)
                throw new ArgumentNullException(GResources.GetResourceText(29450029)); //RC 29450029 : Hodnota je NULL

            property.Set(prop, value);
        }
    }
    /// <summary>
    /// Naposledy otevřené soubory/projekty
    /// </summary>
    public sealed class RecentOpen
    {
        int MAX_LENGTH = 10;

        List<RecentOpenFile> lastfileorproject = new List<RecentOpenFile>();

        /// <summary>
        /// Vyvolá se po změně seznamu naposledy otevřených souborů
        /// </summary>
        public event EventHandler RecentFileChanged;
        /// <summary>
        /// Volá se po změně počtu naposledy otevřených projektů
        /// </summary>
        public event EventHandler RecentProjectChanged;
        
        /// <summary>
        /// Seznam naposledy otevřených souborů
        /// </summary>
        public List<RecentOpenFile> RecentFileOrProject { get { return lastfileorproject; } }

        /// <summary>
        /// Prázdný konstruktor
        /// </summary>
        private RecentOpen() { }

        /// <summary>
        /// Vytvoření insatanci třídy na základě vlastnosti
        /// </summary>
        /// <param name="prop">Vlastnosti</param>
        /// <param name="maxCount">Maximální počet naposledy otevřených souborů</param>
        public RecentOpen(Property prop, int maxCount)
        {
            MAX_LENGTH = maxCount;

            if (prop.Contains("Files"))
            {
                Property element = prop.Get("Files", new Property());
                if (!element.IsEmpty)
                    for (int index = 0; index < element.Elements.Length; index++)
                    {
                        Property fileProp = element.Get(Convert.ToString(index), new Property());
                        if (!fileProp.IsEmpty)
                        {
                            RecentOpenFile rof = RecentOpenFile.FromProperty(fileProp);
                            // pokud soubor není DB soubor a neexistuje na disku, pak ho do seznamu nezapisujeme
                            if (rof.IsDatabaseFile || FileUtility.TestFileExists(rof.Path))
                                lastfileorproject.Add(rof);
                        }
                    }
            }
        }

        /// <summary>
        /// Načtení naposledy otevřených souborů a projektu z XML
        /// </summary>
        /// <param name="properties">Vlastnosti</param>
        /// <param name="maxCount">maximální počet zobrazených souborů</param>
        /// <returns></returns>
        public static RecentOpen FromXmlElement(Property properties, int maxCount)
        {
            return new RecentOpen(properties, maxCount);
        }

        /// <summary>
        /// Získání vlastnosti třídy
        /// </summary>
        /// <returns></returns>
        public Property ToProperties()
        {
            Property p = new Property();
            List<Property> files = new List<Property>();
            foreach (var item in lastfileorproject)
                files.Add(item.ToProperty());
            p.Set("Files", files);
            return p;
        }

        /// <summary>
        /// Nastavení maximální délky zásobníku
        /// </summary>
        /// <param name="value"></param>
        public void SetMaxCount(int value) { MAX_LENGTH = value; }

        /// <summary>
        /// Volá se po přejmenování souboru
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public void FileRenamed(object sender, FileRenameEventArgs e)
        {
            RecentOpenFile rof = lastfileorproject.FirstOrNull(_rof => _rof.Path.Equals(e.SourceFile, StringComparison.InvariantCultureIgnoreCase));
            if (rof != null)
            {
                rof.Path = e.TargetFile;
                OnRecentFileChange();
            }
        }
        /// <summary>
        /// odstranění souboru ze seznamu naposledy otevřených.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        public void FileOrProjectRemove(object sender, FileEventArgs e)
        {
            RecentOpenFile _rof = lastfileorproject.FirstOrNull(rof => rof.Path.Equals(e.FileName, StringComparison.InvariantCultureIgnoreCase));
            if (_rof != null)
            {
                lastfileorproject.Remove(_rof);
                if (_rof.Type.Equals(RecentOpenFileType.project))
                    OnRecentProjectChange();
                else
                    OnRecentFileChange();
            }
        }
        /// <summary>
        /// přidání naposledy otevřeného souboru
        /// </summary>
        /// <param name="file">soubor k přidání</param>
        public void AddLastFile(RecentOpenFile file)
        {
            if (file != null)
            {
                RecentOpenFile rof = lastfileorproject.FirstOrDefault(_rof => _rof.DisplayName.Equals(file.DisplayName, StringComparison.InvariantCultureIgnoreCase));
                if (rof != null)
                    lastfileorproject.Remove(rof);
                else
                    rof = file;

                while (lastfileorproject.Count >= MAX_LENGTH)
                    lastfileorproject.RemoveAt(lastfileorproject.Count - 1);

                if (lastfileorproject.Count > 0)
                    lastfileorproject.Insert(0, file);
                else
                    lastfileorproject.Add(file);

                OnRecentFileChange();
            }
        }

        /// <summary>
        /// získání naposledy otevřeného souboru ze seznamu naposledy použitých.
        /// Pokud takový soubor dle názvu neexistuje, pak ho vytvoříme.
        /// </summary>
        /// <param name="path">Název souboru</param>
        /// <returns></returns>
        public RecentOpenFile GetOrCreateLastFile(string path)
        {
            RecentOpenFile rof = lastfileorproject.FirstOrNull(_rof => _rof.Path.Equals(path, StringComparison.OrdinalIgnoreCase));
            if (rof != null)
                lastfileorproject.Remove(rof);

            while (lastfileorproject.Count >= MAX_LENGTH)
                lastfileorproject.RemoveAt(lastfileorproject.Count - 1);

            if (rof == null)
            {
                rof = new RecentOpenFile(path);
                rof.Set("type", "file");
            }

            if (lastfileorproject.Count > 0)
                lastfileorproject.Insert(0, rof);
            else
                lastfileorproject.Add(rof);
            return rof;
        }
        /// <summary>
        /// Přidání posledního projektu
        /// </summary>
        /// <param name="path"></param>
        public void AddLastProject(string path)
        {
            RecentOpenFile rof = lastfileorproject.FirstOrNull(_rof => _rof.Path.Equals(path, StringComparison.OrdinalIgnoreCase));
            if (rof != null)
                lastfileorproject.Remove(rof);

            while (lastfileorproject.Count >= MAX_LENGTH)
                lastfileorproject.RemoveAt(lastfileorproject.Count - 1);

            if (rof == null)
                rof = new RecentOpenFile(path);

            rof.Set("type", "project");

            if (lastfileorproject.Count > 0)
                lastfileorproject.Insert(0, rof);
            else
                lastfileorproject.Add(rof);
            OnRecentProjectChange();
        }
        /// <summary>
        /// Uvolnění seznamu naposledy otevřených souborů
        /// </summary>
        public void ClearRecentFiles()
        {
            lastfileorproject.Clear();
            OnRecentFileChange();
        }

        /// <summary>
        /// indikuje změnu naposledy otevřeného souboru
        /// </summary>
        public void OnRecentFileChange()
        {
            RecentFileChanged?.Invoke(this, null);
        }
        void OnRecentProjectChange()
        {
            RecentProjectChanged?.Invoke(this, null);
        }
    }
}
