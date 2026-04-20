//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.FiletypeAssociationMaker.cs           </Name>
//    <Description> Jednotka přidružení                                         </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-05                                                  </Created>
//  </FileHeader>

using System.Collections;
using System.Collections.Generic;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.WinClient.FileTypeAssociation
{
    /// <summary>
    /// Jednotka přidružení
    /// </summary>
    class FiletypeAssociation
    {
        readonly string id;
        readonly string icon;
        readonly string text;

        /// <summary>
        /// Konstruktor třídy
        /// </summary>
        /// <param name="id"></param>
        /// <param name="icon"></param>
        /// <param name="text"></param>
        public FiletypeAssociation(string id, string icon, string text)
        {
            this.id = id;
            this.icon = icon;
            this.text = text;
        }

        /// <summary>
        /// Koncovka
        /// </summary>
        public string Extension { get { return id; } }
        /// <summary>
        /// Ikona
        /// </summary>
        public string Icon { get { return icon; } }
        /// <summary>
        /// Text
        /// </summary>
        public string Text { get { return text; } }
    }
    /// <summary>
    /// vytvoření přidružení souboru
    /// </summary>
    class FiletypeAssociationMaker : IMaker
    {
        /// <summary>
        /// Získání seznamu možných přidružení
        /// </summary>
        /// <returns></returns>
        public static List<FiletypeAssociation> GetList()
        {
            return AddInTree.BuildItems<FiletypeAssociation>("/FileTypeAssociation/FileTypes", null, true);
        }

        /// <exclude/>
        public bool HandleConditions { get { return false; } }

        /// <summary>
        /// Vytvoření položky se specifickými podpoložkami
        /// </summary>
        public object BuildItem(object caller, Entity entity, ArrayList subItems)
        {
            return new FiletypeAssociation(entity.Id,
                                           StringParser.Parse(entity.Properties["icon"]),
                                           StringParser.Parse(entity.Properties["text"]));
        }
    }
}
