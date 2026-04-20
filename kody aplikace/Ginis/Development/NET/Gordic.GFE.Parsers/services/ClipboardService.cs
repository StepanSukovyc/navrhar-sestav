//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.ClipboardService.cs                      </Name>
//    <Description> Služba pro práci s clipboardem                              </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-03-11                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.Parsers
{
    /// <summary>
    /// Služba pro práci s clipboardem
    /// </summary>
    public static class ClipboardService
    {
        /// <summary>
        /// Indikuje možnost vložení
        /// </summary>
        public static bool EnablePaste { get => copied.Count != 0; }

        /// <summary>
        /// Zkopírovaný pro formát objekt 
        /// </summary>
        public static object CopiedFormat { get => copyFormat; }

        /// <summary>
        /// Odstranění vybraných objektů
        /// </summary>
        /// <param name="service">Služba pro práci s vybranými objekty</param>
        public static void Delete(SelectionService service)
        {
            ThreadService.SafeThreadAsyncCall(
                delegate
            {
                // pokud nejsou vybrané objekty, pak není co řešit
                if (service != null)
                {
                    List<object> selected = service.SelectedComponents?
                        .Select(cmp => cmp is IParentable
                            ? cmp
                            : (cmp is IPage ? cmp : null))
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);

                    if (selected.Count != 0)
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450474))) //RC 29450474 : odstranění vybraných objektů
                        {
                            selected.ForEach(Delete);
                            UndoRedoService.Commit();
                        }
                }
            });
        }

        static void Delete(object cmp)
        {
            if (cmp is IParentable)
            {
                if ((cmp as IParentable).Parent is URAbstractContainer)
                    ((cmp as IParentable).Parent as URAbstractContainer).Delete(cmp as ITagComponent);
                else if ((cmp as IParentable).Parent is IGRRLabel)
                    ((cmp as IParentable).Parent as IGRRLabel).Remove(cmp);
                else if ((cmp as IParentable).Parent is ICell)
                    ((cmp as IParentable).Parent as ICell).Delete(cmp);
                (cmp as IParentable).Parent = null;
            }
            else if (cmp is IPage
                && MessageService.AskQuestion(string.Format(GResources.GetResourceText(29450475) + " '{0}'?", (cmp as IPage).Order))) //RC 29450475 : Opravdu si přejete odstranit stránku číslo
                ((cmp as IPage).PagePanel as AbstractPagePanel).RemovePage(cmp as IPage);
        }

        static readonly List<object> copied = new List<object>();
        /// <summary>
        /// Kopírování vybraných objektů
        /// </summary>
        /// <param name="service">Služba pro práci s vybranými objekty</param>
        public static void Copy(SelectionService service)
        {
            // vyprázdníme seznam dříve zkopírovaných objektu
            copied.Clear();

            // projdeme všechny vybrané objekty a zkopírujeme
            foreach (object item in service.SelectedComponents)
                // podmínka, že vlastník není zkopírován je nutná, jelikož v případě kopírování vlastníka se automaticky kopírují všechny vnořené objekty
                if (item is ICloneable && !service.SelectedComponents.Contains((item as IParentable).Parent))
                    copied.Add((item as ICloneable).Clone());
                else continue;

            if (UndoRedoService.IsTransactionStarted)
                UndoRedoService.FlushHistory();
        }
        /// <summary>
        /// Kopírování daného objektu
        /// </summary>
        /// <param name="copy">odkaz na kopírovaný objekt</param>
        public static void Copy(object copy)
        {
            // vyprázdníme seznam dříve zkopírovaných objektu
            copied.Clear();
            copied.Add(copy);
        }
        /// <summary>
        /// Kopírování vybraných objektů
        /// </summary>
        /// <param name="clone">Kopírovaný objekt</param>
        public static void CopyFormat(ICloneable clone)
        {
            if (clone == null)
                return;

            // zkopírujeme objekt
            copyFormat = clone.Clone();
        }
        /// <summary>
        /// Vložení objektů ze zásobníku na plochu
        /// </summary>
        /// <param name="panel">Plocha</param>
        /// <param name="location">Pozice, na kterou se vkládá</param>
        public static void Paste(AbstractPagePanel panel, Point location)
        {
            if (UndoRedoService.IsTransactionStarted)
                UndoRedoService.FlushHistory();
            UndoRedoService.StartTransaction(GResources.GetResourceText(29450476)); //RC 29450476 : vložení objektu
            panel.InsertObjects(copied, location);
        }

        static object copyFormat = null;
        /// <summary>
        /// Kopírování formátu objektu
        /// </summary>
        /// <param name="service">Služba pro práci s vybranými objekty</param>
        public static void CopyFormat(SelectionService service)
        {
            // projdeme všechny vybrané objekty a zkopírujeme formát alespoň jednoho
            foreach (object _item in service.SelectedComponents)
                if (_item is IFormatHandler)
                {
                    copyFormat = (_item as ICloneable).Clone();
                    break;
                }
                else continue;

            if (UndoRedoService.IsTransactionStarted)
                UndoRedoService.FlushHistory();
        }
    }
}
