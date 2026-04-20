//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.AbstractSolutionFolder.cs              </Name>
//    <Description> Výchozí implementace rozhraní ISolutionFolderContainer. Vláknově bezpečná.</Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using System.ComponentModel;
using System.Xml;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Výchozí implementace rozhraní ISolutionFolderContainer. Vláknově bezpečná.
    /// </summary>
    abstract class AbstractSolutionFolder : ISolutionFolder
    {
        #region ISolutionFolder
        /// <summary>
        /// Objekt používaný pro synchronizací
        /// </summary>
        [Browsable(false)]
        public object SyncRoot { get { return syncRoot; } }
        /// <summary>
        /// Kontainer obsahující danou složku
        /// </summary>
        [Browsable(false)]
        public ISolutionFolderContainer Parent
        {
            get { return parent; }
            set { lock (syncRoot) { parent = value; } }
        }
        /// <summary>
        /// Umístění
        /// </summary>
        [Browsable(false)]
        public string Location { get; set; }

        string name;
        /// <summary>
        /// Název
        /// </summary>
        [Browsable(false)]
        public string Name { get { return name; } set { name = value; } }
        /// <summary>
        /// Jednoznačný identifikátor složky
        /// </summary>
        [Browsable(false)]
        public virtual string IdGuid { get; set; }

        /// <summary>
        /// akce uložení
        /// </summary>
        /// <param name="main">hlavní větev XML obsahu</param>
        /// <param name="xmlDoc">XML dokument výstupu</param>
        public virtual void Save(XmlElement main, XmlDocumentPosition xmlDoc) { }
        /// <summary>
        /// 
        /// </summary>
        public virtual void OnAfterLoad() { }
        #endregion

        readonly object syncRoot = new object();

        ISolutionFolderContainer parent = null;
        /// <summary>
        /// řešení, kterému patří daný projekt.
        /// </summary>
        [Browsable(false)]
        public virtual Solution ParentSolution
        {
            get { lock (syncRoot) { return parent?.ParentSolution; } }
        }
    }
}
