//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.FormationService.cs                      </Name>
//    <Description> služba pro práci se sestavou                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-06-25                                                  </Created>
//  </FileHeader>

using System.Collections.Generic;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;

namespace Gordic.GFE.Parsers.Services
{
    /// <summary>
    /// služba pro práci se sestavou
    /// </summary>
    public static class FormationService
    {
        /// <summary>
        /// načtení skriptů
        /// </summary>
        /// <param name="format">format sestavy</param>
        /// <param name="scripts">seznam skriptů sestavy</param>
        public static void LoadScripts(GFEFormat format, List<string> scripts)
        {
            scripts.Clear();
            if (format != null)
            {
                List<GFEFormatTag> list = format.Root.Body?.FindAll(itm => itm is GFEScript);
                // projdeme všechny skripty před tělem
                if (list != null)
                    foreach (var item in list)
                        scripts.Add((item as GFEScript).ScriptText);
            }
        }
        /// <summary>
        /// načtení neznámých (globálních) větví
        /// </summary>
        /// <param name="format">formát sestavy</param>
        /// <param name="unknowns">seznam, do kterého se neznámé větve uloží</param>
        public static void LoadUnknowns(GFEFormat format, List<GFEFormatTag> unknowns)
        {
            unknowns.Clear();

            if (format != null)
                // projdeme jenom neznamé větve před tělem
                foreach (GFEFormatTag item in format.Root.Body)
                    if (item is GFEFormatUnknown)
                        unknowns.Add(item);
        }

        /// <summary>
        /// Načtení komentářů
        /// </summary>
        /// <param name="format">formát sestavy</param>
        /// <param name="comments">seznam, do kterého se komentáře uloží</param>
        public static void LoadComments(GFEFormat format, List<DefaultComment> comments)
        {
            comments.Clear();

            if (format != null)
                // projdeme jenom komentáře před tělem
                foreach (GFEFormatTag item in format.Root.Body)
                    if (item is GFEFormatComment)
                        AddComment((item as GFEFormatComment).CommentText, comments);
        }
        /// <summary>
        /// Přidání komentáře
        /// </summary>
        /// <param name="p_item">Komentář</param>
        /// <param name="comments">seznam položek-komentářů</param>
        static void AddComment(string p_item, List<DefaultComment> comments)
        {
            if (p_item.Contains("#ZMENY"))
            {
                string _befoure = p_item.Trim().Substring(0, p_item.Trim().IndexOf("#ZMENY"));
                if (!string.IsNullOrEmpty(_befoure.Trim()))
                    AddComment(_befoure.Trim(), comments);

                string text = p_item.Remove(0, p_item.IndexOf("#ZMENY") + 6)
                , textComment = text.Contains("#ZMENY") ? text.Substring(0, text.IndexOf("#ZMENY")) : text;
                comments.Add(new DefaultComment(textComment.Trim(), true));

                if (text.Contains("#ZMENY"))
                {
                    text = text.Remove(0, text.IndexOf("#ZMENY") + 6);
                    if (!string.IsNullOrEmpty(text.Trim()))
                        AddComment(text.Trim(), comments);
                }
            }
            else
                comments.Add(new DefaultComment(p_item.Trim()));
        }
    }
}
