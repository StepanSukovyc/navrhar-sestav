//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SsrProjectSection.cs                   </Name>
//    <Description> sekce projektu SSR                                          </Description>
//    <Author>      Mgr. Stepan Sukovyč                                         </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2014-05-28                                                  </Created>
//  </FileHeader>

using Gordic.GFE.Parsers.AddIns.Project;
using Gordic.Report.Implementation;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Utils;
using System.IO;
using Gordic.General;

namespace Gordic.GFE.WinClient.SsrBinding
{
    /// <summary>
    /// rozhraní SSR sekcí
    /// </summary>
    interface ISsrSection
    {
        /// <summary>
        /// seznam atributů sekce
        /// </summary>
        Dictionary<string, string> Attributes { get; }
        /// <summary>
        /// název elementu sekce
        /// </summary>
        string ElementName { get; }
        /// <summary>
        /// Jméno souboru s cestou
        /// </summary>
        string FileName { get; }
        /// <summary>
        /// Jméno souboru bez cesty
        /// </summary>
        string FileNameOnly { get; }
        /// <summary>
        /// titulek
        /// </summary>
        string Title { get; set; }
    }

    /// <summary>
    /// sekce projektu SSR
    /// </summary>
    class SsrProjectSection : ProjectSection, ISsrSection
    {
        #region ISsrSection
        Dictionary<string, string> attributes = new Dictionary<string, string>();
        /// <summary>
        /// seznam atributů sekce
        /// </summary>
        public Dictionary<string, string> Attributes { get { return attributes; } }

        readonly string elementName;
        /// <summary>
        /// název elementu sekce
        /// </summary>
        public string ElementName { get { return elementName; } }

        readonly string fileName;
        /// <summary>
        /// Jméno souboru s cestou
        /// </summary>
        public string FileName { get { return fileName; } }
        /// <summary>
        /// Jméno souboru bez cesty
        /// </summary>
        public string FileNameOnly { get { return System.IO.Path.GetFileName(fileName); } }
        string title;
        /// <summary>
        /// titulek
        /// </summary>
        public string Title { get { return title; } set { title = value; } }
        #endregion

        /// <summary>
        /// konstruktor objektu
        /// </summary>
        /// <param name="element">element SSR obsahu</param>
        public SsrProjectSection(GSsrElement element)
            : base(element.ElementName, ItemType.Element)
        {
            attributes.AddRange(element.Attributes);
            elementName = element.ElementName;
            if (element.Attributes.ContainsKey("title"))
                title = element.Attributes["title"];
        }

        /// <summary>
        /// konstruktor objektu
        /// </summary>
        /// <param name="file">soubor SSR obsahu</param>
        /// <param name="itemType">typ souboru</param>
        public SsrProjectSection(GSsrFile file, ItemType itemType)
            : base(file.NameOnly, itemType)
        {
            attributes.AddRange(file.Attributes);
            fileName = file.Name;
            elementName = file.ElementName;
            title = file.Title;
        }

        /// <summary>
        /// konstruktor objektu
        /// </summary>
        /// <param name="name">soubor SSR obsahu</param>
        /// <param name="itemType">typ souboru</param>
        public SsrProjectSection(string name, ItemType itemType)
            : base(name, itemType)
        {
            this.fileName = name;
        }

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="sps">sekce projektu, ze které se kopírují údaje</param>
        /// <param name="fullFileName">úplný název souboru</param>
        public SsrProjectSection(SsrProjectSection sps, string fullFileName = null)
            : this(string.IsNullOrEmpty(fullFileName) ? GResources.GetResourceText(29451441) : Path.GetFileName(fullFileName), sps.SectionType)
        {
            if (string.IsNullOrEmpty(fullFileName))
                this.fileName = sps.FileName;

            attributes = new Dictionary<string, string>(sps.Attributes);
            elementName = sps.ElementName;
            title = sps.Title;
        }

    }
}
