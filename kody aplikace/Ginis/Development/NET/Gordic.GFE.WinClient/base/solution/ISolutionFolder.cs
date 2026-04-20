//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.ISolutionFolder.cs                     </Name>
//    <Description> Rozhraní složek projektu nebo řešení                        </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-01-24                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.Gui;
using System.Xml;

namespace Gordic.GFE.WinClient.Project
{
    /// <summary>
    /// Rozhraní složek projektu nebo řešení
    /// </summary>
    interface ISolutionFolder
    {
        /// <summary>
        /// Objekt pro synchronizací
        /// </summary>
        object SyncRoot { get; }

        /// <summary>
        /// Kontainer obsahující danou složku
        /// </summary>
        ISolutionFolderContainer Parent { get; set; }

        /// <summary>
        /// Umístění
        /// </summary>
        string Location { get; set; }
        /// <summary>
        /// Název
        /// </summary>
        string Name { get; set; }
        /// <summary>
        /// Identifikátor složky
        /// </summary>
        string IdGuid { get; set; }

        /// <summary>
        /// akce uložení
        /// </summary>
        /// <param name="main">hlavní větev XML obsahu</param>
        /// <param name="xmlDoc">XML dokument výstupu</param>
        void Save(XmlElement main, XmlDocumentPosition xmlDoc);
        /// <summary>
        /// 
        /// </summary>
        void OnAfterLoad();
    }
}
