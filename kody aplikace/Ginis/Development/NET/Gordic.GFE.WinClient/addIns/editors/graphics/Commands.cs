//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.Commands.cs                            </Name>
//    <Description> Zobrazit/skrýt mřížku                                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-04-25                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Editor;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Hosting;
using Gordic.GFE.Parsers.Services;
using Gordic.GFE.WinClient.Editor;
using Gordic.GFE.WinClient.Gui.Dialogs;
using Gordic.General;
using Gordic.GFE.WinClient.Base;

namespace Gordic.GFE.WinClient.Gui
{
    #region Line
    class HeightByContent : AbstractCheckableMenuCommand
    {
        SelectionService service;
        /// <exclude/>
        public override bool IsChecked
        {
            get
            {
                IHost host = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                service = host?.ServiceSelection;

                if (service != null)
                    base.IsChecked = service.SelectedComponents
                        .All(obj => obj is ITagComponent
                        && (obj as ITagComponent).Parent is ICell
                        && ((obj as ITagComponent).Parent as ICell).Line != null
                        && ((obj as ITagComponent).Parent as ICell).Line.IsHeightByContent);

                return base.IsChecked;
            }
            set
            {
                base.IsChecked = value;
                ThreadService.SafeThreadAsyncCall(delegate
                {
                    List<ILine> selected = service.SelectedComponents?
                        .Select(obj => obj is ITagComponent && (obj as ITagComponent).Parent is ICell && ((obj as ITagComponent).Parent as ICell).Line != null ? ((obj as ITagComponent).Parent as ICell).Line : null)
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);

                    if (selected.Count != 0)
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450087))) //RC 29450087 : vložení nového řádku do vybrané sekce
                        {
                            selected.ForEach(CheckChecked, value);
                            UndoRedoService.Commit();
                        }
                });
            }
        }

        void CheckChecked(object line, params object[] param)
        {
            if (line is ILine)
                (line as ILine).IsHeightByContent = bool.Parse(Convert.ToString(param[0]));
        }

        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get => service != null
                    ? service.SelectedComponents
                        .Exists(obj => obj is ITagComponent
                        && (obj as ITagComponent).Parent is ICell
                        && ((obj as ITagComponent).Parent as ICell).Line != null)
                        : false;
        }
    }
    #endregion

    #region Insert
    class AbstractInsertMenuCommand : AbstractMenuCommand
    {
        protected IHost editable;
        protected SelectionService service;
        /// <exclude/>
        public override void Run() { }

        /// <summary>
        /// dotaz na vložení nového řádku
        /// </summary>
        protected bool InsertLine
        {
            get
            {
                if (ReportDesignerProperties.Instance.GrrAutoInsertLine)
                    return true;

                QuestionWithDefaultDialog slf = new QuestionWithDefaultDialog();
                slf.AddControl(new QPInsertLine());
                return slf.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK;
            }
        }
        /// <summary>
        /// dotaz na vložení nové buňky
        /// </summary>
        protected bool InsertCell
        {
            get
            {
                if (ReportDesignerProperties.Instance.GrrAutoInsertCell)
                    return true;

                QuestionWithDefaultDialog slf = new QuestionWithDefaultDialog();
                slf.AddControl(new QPInsertCell());
                return slf.ShowDialog(SimpleDesktop.MainForm) == DialogResult.OK;
            }
        }
    }

    /// <summary>
    /// Vložení nového řádku PŘED aktuální
    /// </summary>
    class InsertLineBefore : AbstractInsertMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    service = editable.ServiceSelection;
                    if (service != null)
                        return
                            service.SelectedComponents.Exists(itm => (itm is IParentable
                                                            && (itm as IParentable).Parent is ICell
                                                            && ((itm as IParentable).Parent as ICell).Line is ILine)
                                                            || (itm is IGRRLabel && (itm as IGRRLabel).EnableLineBefore));
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                try
                {
                    if (IsEnabled)
                    {
                        List<object> selected = service.SelectedComponents?
                            .Select(pr => pr is IGRRLabel ? pr : (pr is IParentable ? (pr as IParentable).Parent : null))
                            .Select(obj => obj is ICell ? (obj as ICell).Line : (obj is AbstractLabel ? obj : null))
                            .Distinct()
                            .ToList()
                            .FindAll(cm => cm != null);

                        if (selected.Count != 0)
                        {
                            bool existsLine = selected.Exists(itm => itm is ILine);
                            if (existsLine && InsertLine || !existsLine)
                                using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450088))) //RC 29450088 : vložení nového řádku před daný
                                {
                                    selected.ForEach(InsertBefore);
                                    UndoRedoService.Commit();
                                }
                            else
                                MessageService.ShowInformation(GResources.GetResourceText(29450089)); //RC 29450089 : Akce vložení řádku před vybraný nebude provedená.
                        }
                    }
                }
                catch (Exception ex)
                {
                    if (UndoRedoService.IsTransactionStarted)
                        UndoRedoService.FlushHistory();
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450090)  //RC 29450090 : Chyba vložení řádku PŘED vybraný!
                        + "\n{0}", ex.Message);
                }
            });
        }
        void InsertBefore(object cmp)
        {
            if (cmp is IParentable)
                if ((cmp as IParentable).Parent is ILineManipulator)
                    // pro štítek se ohled na konfigurací nebere
                    ((cmp as IParentable).Parent as ILineManipulator).InsertBefore(cmp, cmp is ILine);
        }
    }
    /// <summary>
    /// Vložení nového řádku ZA aktuální
    /// </summary>
    class InsertLineAfter : AbstractInsertMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    service = editable.ServiceSelection;
                    if (service != null)
                        return
                            service.SelectedComponents.Exists(itm => (itm is IParentable
                                                            && (itm as IParentable).Parent is ICell
                                                            && ((itm as IParentable).Parent as ICell).Line is ILine)
                                                            || (itm is IGRRLabel && (itm as IGRRLabel).EnableLineAfter));
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                try
                {
                    if (IsEnabled)
                    {
                        List<object> selected = service.SelectedComponents?
                            .Select(pr => pr is IGRRLabel ? pr : (pr is IParentable ? (pr as IParentable).Parent : null))
                            .Select(obj => obj is ICell ? (obj as ICell).Line : (obj is AbstractLabel ? obj : null))
                            .Distinct()
                            .ToList()
                            .FindAll(cm => cm != null);

                        if (selected.Count != 0)
                        {
                            bool existsLine = selected.Exists(itm => itm is ILine);
                            if (existsLine && InsertLine || !existsLine)
                                using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450091))) //RC 29450091 : vložení nového řádku za daný
                                {
                                    selected.ForEach(InsertAfter);
                                    UndoRedoService.Commit();
                                }
                            else
                                MessageService.ShowInformation(GResources.GetResourceText(29450092)); //RC 29450092 : Akce vložení řádku za vybraný nebude provedená.
                        }
                    }
                }
                catch (Exception ex)
                {
                    if (UndoRedoService.IsTransactionStarted)
                        UndoRedoService.FlushHistory();
                    MessageService.ShowErrorFormatted(GResources.GetResourceText(29450093)  //RC 29450093 : Chyba vložení řádku ZA vybraný!
                        + "\n{0}", ex.Message);
                }
            });
        }
        void InsertAfter(object cmp)
        {
            if (cmp is IParentable)
                if ((cmp as IParentable).Parent is ILineManipulator)
                    // pro štítek se ohled na konfigurací nebere
                    ((cmp as IParentable).Parent as ILineManipulator).InsertAfter(cmp, cmp is ILine);
        }
    }

    /// <summary>
    /// Vložení nové buňky PŘED aktuální
    /// </summary>
    class InsertCellBefore : AbstractInsertMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    service = editable.ServiceSelection;
                    if (service != null)
                        return
                            service.SelectedComponents.Exists(itm => (itm is IParentable
                                                            && (itm as IParentable).Parent is ICell));
                }
                return false;
            }
        }
        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsEnabled)
                {
                    List<ISizable> selected = service.SelectedComponents?
                        .Select(itm => itm is IParentable ? (itm as IParentable).Parent : null)
                        .Select(itm => itm is ICell ? itm : null)
                        .Distinct()
                        .ToList()
                        .FindAll(itm => itm != null);

                    if (selected.Count != 0)
                        if (InsertCell)
                            using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450094))) //RC 29450094 : vložení nové buňky PŘED vybranou
                            {
                                selected.ForEach(Insert_CellBefore);
                                UndoRedoService.Commit();
                            }
                        else
                            MessageService.ShowInformation(GResources.GetResourceText(29450095)); //RC 29450095 : Akce vložení buňky PŘED vybranou nebude provedená.
                }
            });
        }
        void Insert_CellBefore(object cmp)
        {
            if (cmp is ICell)
                (cmp as ICell).Line.InsertCellBefore(cmp as ICell);
        }
    }
    /// <summary>
    /// Vložení nové buňky ZA aktuální
    /// </summary>
    class InsertCellAfter : AbstractInsertMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    service = editable.ServiceSelection;
                    if (service != null)
                        return
                            service.SelectedComponents.Exists(itm => (itm is IParentable
                                                            && (itm as IParentable).Parent is ICell));
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsEnabled)
                {
                    List<ISizable> selected = service.SelectedComponents?
                        .Select(itm => itm is IParentable ? (itm as IParentable).Parent : null)
                        .Select(itm => itm is ICell ? itm : null)
                        .Distinct()
                        .ToList()
                        .FindAll(itm => itm != null);

                    if (selected.Count != 0)
                        if (InsertCell)
                            using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450096))) //RC 29450096 : vložení nové buňky ZA vybranou
                            {
                                selected.ForEach(Insert_CellAfter);
                                UndoRedoService.Commit();
                            }
                        else
                            MessageService.ShowInformation(GResources.GetResourceText(29450097)); //RC 29450097 : Akce vložení buňky ZA vybranou nebude provedená.
                }
            });
        }
        void Insert_CellAfter(object cmp)
        {
            if (cmp is ICell)
                (cmp as ICell).Line.InsertCellAfter(cmp as ICell);
        }
    }

    /// <summary>
    /// příkaz vložení řádku
    /// </summary>
    abstract class AbstractInsertLineMenuCommand : AbstractMenuCommand
    {
        /// <summary>
        /// služba výběru objektů
        /// </summary>
        protected SelectionService service;

        /// <summary>
        /// dostupnost operace
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                if (SimpleDesktop.Desktop.ActiveViewContent is IHost host)
                    service = host.ServiceSelection;

                return service != null && service.SelectedComponents.Exists(cm => (cm is ILabel && (cm as ILabel).Parent is ILabel) || (!(cm is ILabel) && (cm is ILineManipulator)));
            }
        }

        /// <summary>
        /// spuštění akce vložení
        /// </summary>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (this.IsEnabled)
                {
                    List<object> selected = service.SelectedComponents?
                        .Select(pr => pr is ILabel || (pr is ILineManipulator) ? pr : null)
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);

                    if (selected.Count != 0)
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450087))) //RC 29450087 : vložení nového řádku do vybrané sekce
                        {
                            selected.ForEach(InserTo);
                            UndoRedoService.Commit();
                        }
                }
            });
        }

        /// <summary>
        /// vložení řádku
        /// </summary>
        /// <param name="obj">štítek pro provedené operace</param>
        abstract protected void InserTo(object obj);
    }


    /// <summary>
    /// Vložení nového řádku do hlavičky štitku
    /// </summary>
    class InsertLineToHead : AbstractInsertLineMenuCommand
    {
        /// <summary>
        /// vložení řádku
        /// </summary>
        /// <param name="obj">štítek pro provedené operace</param>
        protected override void InserTo(object obj)
        {
            if (obj is IGRRLabel)
                (obj as IGRRLabel).InsertTo(typeof(GrrLine), LineType.head);
        }
    }
    /// <summary>
    /// Vložení nového řádku do těla štitku
    /// </summary>
    class InsertLineToBody : AbstractInsertLineMenuCommand
    {
        /// <summary>
        /// dostupnost operace
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                if (SimpleDesktop.Desktop.ActiveViewContent is IHost host)
                    service = host.ServiceSelection;

                // vyjmutá podmínka, že štítek nesmí být ROOT
                return service != null && service.SelectedComponents.Exists(cm => (cm is ILabel) || (cm is ILineManipulator));
            }
        }

        /// <summary>
        /// vložení řádku
        /// </summary>
        /// <param name="obj">štítek pro provedené operace</param>
        protected override void InserTo(object obj)
        {
            if (obj is ILineManipulator)
                (obj as ILineManipulator).InsertTo(typeof(GrrLine));
        }
    }
    /// <summary>
    /// Vložení nového řádku do patičky štitku
    /// </summary>
    class InsertLineToFoot : AbstractInsertLineMenuCommand
    {
        /// <summary>
        /// vložení řádku
        /// </summary>
        /// <param name="obj">štítek pro provedené operace</param>
        protected override void InserTo(object obj)
        {
            if (obj is IGRRLabel)
                (obj as IGRRLabel).InsertTo(typeof(GrrLine), LineType.foot);
        }
    }
    #endregion

    #region Move
    class AbstractMoveMenuCommand : AbstractMenuCommand
    {
        protected IHost editable;
        protected SelectionService service;
        /// <exclude/>
        public override void Run() { }
    }

    /// <summary>
    /// P5esun aktuálního objektu do hlavičky
    /// </summary>
    class MoveHead : AbstractMoveMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    service = editable.ServiceSelection;
                    if (service != null)
                        return
                            service.SelectedComponents.Exists(itm => (itm is IParentable
                                                            && (itm as IParentable).Parent is ICell
                                                            && ((itm as IParentable).Parent as ICell).Line is ILine
                                                            && (((itm as IParentable).Parent as ICell).Line as ILine).EnableMoveToHead));
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (this.IsEnabled)
                {
                    List<ILine> selected = service.SelectedComponents?
                        .Select(itm => itm is IParentable
                            && (itm as IParentable).Parent is ICell
                            && ((itm as IParentable).Parent as ICell).Line is ILine
                            && (((itm as IParentable).Parent as ICell).Line as ILine).EnableMoveToHead
                            ? ((itm as IParentable).Parent as ICell).Line : null)
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);

                    if (selected.Count != 0)
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450098))) //RC 29450098 : přetažení vybraných řádků do hlavičky
                        {
                            selected.ForEach(MoveToHead);
                            UndoRedoService.Commit();
                        }
                }
            });
        }

        void MoveToHead(ILine line) { line.Type = LineType.head; }
    }
    /// <summary>
    /// Přesun aktuálního objektu do těla
    /// </summary>
    class MoveBody : AbstractMoveMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    service = editable.ServiceSelection;
                    if (service != null)
                        return
                            service.SelectedComponents.Exists(itm => (itm is IParentable
                                                            && (itm as IParentable).Parent is ICell
                                                            && ((itm as IParentable).Parent as ICell).Line is ILine
                                                            && (((itm as IParentable).Parent as ICell).Line as ILine).EnableMoveToBody));
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (this.IsEnabled)
                {
                    List<ILine> selected = service.SelectedComponents?
                        .Select(itm => itm is IParentable
                            && (itm as IParentable).Parent is ICell
                            && ((itm as IParentable).Parent as ICell).Line is ILine
                            && (((itm as IParentable).Parent as ICell).Line as ILine).EnableMoveToBody
                            ? ((itm as IParentable).Parent as ICell).Line : null)
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);

                    if (selected.Count != 0)
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450099))) //RC 29450099 : přetažení vybraných řádků do těla
                        {
                            selected.ForEach(MoveToBody);
                            UndoRedoService.Commit();
                        }
                }
            });
        }

        void MoveToBody(ILine line) { line.Type = LineType.body; }
    }
    /// <summary>
    /// Přesun aktuálního objektu do patičky
    /// </summary>
    class MoveFoot : AbstractMoveMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    service = editable.ServiceSelection;
                    if (service != null)
                        return
                            service.SelectedComponents.Exists(itm => (itm is IParentable
                                                            && (itm as IParentable).Parent is ICell
                                                            && ((itm as IParentable).Parent as ICell).Line is ILine
                                                            && (((itm as IParentable).Parent as ICell).Line as ILine).EnableMoveToFoot));
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (this.IsEnabled)
                {
                    List<ILine> selected = service.SelectedComponents?
                        .Select(itm => itm is IParentable
                            && (itm as IParentable).Parent is ICell
                            && ((itm as IParentable).Parent as ICell).Line is ILine
                            && (((itm as IParentable).Parent as ICell).Line as ILine).EnableMoveToFoot
                            ? ((itm as IParentable).Parent as ICell).Line : null)
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);

                    if (selected.Count != 0)
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450100))) //RC 29450100 : přetažení vybraných řádků do patičky
                        {
                            selected.ForEach(MoveToFoot);
                            UndoRedoService.Commit();
                        }
                }
            });
        }

        void MoveToFoot(ILine line) { line.Type = LineType.foot; }
    }

    /// <summary>
    /// Přesun aktuálního objektu do hlavičky
    /// </summary>
    class MoveHeadRegion : AbstractMenuCommand
    {
        ILineHandler editable;
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as ILineHandler;
                return editable != null && editable.EnableMoveToHeadRegion;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            if (editable != null)
                editable.MoveToHeadRegion(null);
        }
    }
    /// <summary>
    /// Přesun aktuálního objektu do patičky nadřazeného regionu (případ, kdy řádek je ve skupině)
    /// </summary>
    class MoveFootRegion : AbstractMenuCommand
    {
        ILineHandler editable;
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as ILineHandler;
                return editable != null && editable.EnableMoveToFootRegion;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            if (editable != null)
                editable.MoveToFootRegion(null);
        }
    }
    #endregion

    #region Shift
    /// <summary>
    /// Posunutí aktuálního objektu o jeden objekt nahoru
    /// </summary>
    class ShiftUp : AbstractMenuCommand
    {
        protected IHost editable;
        protected SelectionService ServiceSelection;
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    ServiceSelection = editable.ServiceSelection;
                    if (ServiceSelection != null)
                        return
                            ServiceSelection.SelectedComponents.Exists(itm =>
                                (itm is IParentable && (itm as IParentable).Parent is ICell && ((itm as IParentable).Parent as ICell).Line.EnableShiftUp)
                                || (itm is ILabel && (itm as IGRRLabel).EnableShiftUp));
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsEnabled)
                {
                    List<object> selected = ServiceSelection.SelectedComponents?
                        .Select(pr => pr is ILabel ? pr : (pr is IParentable ? (pr as IParentable).Parent : null))
                        .Select(obj => obj is ICell ? (obj as ICell).Line : (obj is AbstractLabel ? obj : null))
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);

                    if (selected.Count != 0)
                    {
                        selected.Sort(new TopComparer(false));
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450101))) //RC 29450101 : posun objektů o jeden nahoru
                        {
                            selected.ForEach(Shift_Up);
                            UndoRedoService.Commit();
                        }
                    }
                }
            });
        }

        void Shift_Up(object cmp)
        {
            if (cmp is IParentable)
                if ((cmp as IParentable).Parent is ILineManipulator)
                    ((cmp as IParentable).Parent as ILineManipulator).ShiftUp(cmp);
        }
    }
    /// <summary>
    /// Posunutí aktuálního objektu o jeden objekt dolů
    /// </summary>
    class ShiftDown : AbstractMenuCommand
    {
        protected IHost editable;
        protected SelectionService ServiceSelection;
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    ServiceSelection = editable.ServiceSelection;
                    if (ServiceSelection != null)
                        return
                            ServiceSelection.SelectedComponents.Exists(itm =>
                                (itm is IParentable && (itm as IParentable).Parent is ICell && ((itm as IParentable).Parent as ICell).Line.EnableShiftDown)
                                || (itm is ILabel && (itm as IGRRLabel).EnableShiftDown));
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsEnabled)
                {
                    List<object> selected = ServiceSelection.SelectedComponents?
                        .Select(pr => pr is ILabel ? pr : (pr is IParentable ? (pr as IParentable).Parent : null))
                        .Select(obj => obj is ICell ? (obj as ICell).Line : (obj is AbstractLabel ? obj : null))
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);

                    if (selected.Count != 0)
                    {
                        selected.Sort(new TopComparer(true));
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450102))) //RC 29450102 : posun objektů o jeden dolů
                        {
                            selected.ForEach(Shift_Down);
                            UndoRedoService.Commit();
                        }
                    }
                }
            });
        }

        void Shift_Down(object cmp)
        {
            if (cmp is IParentable)
                if ((cmp as IParentable).Parent is ILineManipulator)
                    ((cmp as IParentable).Parent as ILineManipulator).ShiftDown(cmp);
        }
    }

    /// <summary>
    /// Posunutí aktuálního objektu o jeden objekt doleva
    /// </summary>
    class ShiftLeft : AbstractMenuCommand
    {
        protected IHost editable;
        protected SelectionService ServiceSelection;
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    ServiceSelection = editable.ServiceSelection;
                    if (ServiceSelection != null)
                        return
                            ServiceSelection.SelectedComponents.Exists(itm => itm is IParentable
                                                            && (itm as IParentable).Parent is ICell
                                                            && ((itm as IParentable).Parent as ICell).EnableShiftLeft);
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsEnabled)
                {
                    List<ISizable> selected = ServiceSelection.SelectedComponents?
                        .Select(itm => itm is IParentable ? (itm as IParentable).Parent : null)
                        .Select(itm => itm is ICell ? itm : null)
                        .Distinct()
                        .ToList()
                        .FindAll(itm => itm != null);
                    if (selected.Count != 0)
                    {
                        selected.Sort(new LeftComparer(false));
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450103))) //RC 29450103 : posun buňky o jednu doleva
                        {
                            selected.ForEach(Shift_Left);
                            UndoRedoService.Commit();
                        }
                    }
                }
            });
        }

        void Shift_Left(object cmp)
        {
            if (cmp is ICell)
                (cmp as ICell).Line.ShiftLeft(cmp as ICell);
        }
    }
    /// <summary>
    /// Posunutí aktuálního objektu o jeden objekt doprava
    /// </summary>
    class ShiftRight : AbstractMenuCommand
    {
        protected IHost editable;
        protected SelectionService ServiceSelection;
        /// <exclude/>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as IHost;
                if (editable != null)
                {
                    ServiceSelection = editable.ServiceSelection;
                    if (ServiceSelection != null)
                        return
                            ServiceSelection.SelectedComponents.Exists(itm => itm is IParentable
                                                            && (itm as IParentable).Parent is ICell
                                                            && ((itm as IParentable).Parent as ICell).EnableShiftRight);
                }
                return false;
            }
        }

        /// <exclude/>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsEnabled)
                {
                    List<ISizable> selected = ServiceSelection.SelectedComponents?
                        .Select(itm => itm is IParentable ? (itm as IParentable).Parent : null)
                        .Select(itm => itm is ICell ? itm : null)
                        .Distinct()
                        .ToList()
                        .FindAll(itm => itm != null);

                    if (selected.Count != 0)
                    {
                        selected.Sort(new LeftComparer(true));
                        using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450104))) //RC 29450104 : posun buňky o jednu doprava
                        {
                            selected.ForEach(Shift_Right);
                            UndoRedoService.Commit();
                        }
                    }
                }
            });
        }
        void Shift_Right(object cmp)
        {
            if (cmp is ICell)
                (cmp as ICell).Line.ShiftRight(cmp as ICell);
        }

    }
    #endregion    

    #region Chart Layers
    /// <summary>
    /// Posunutí aktuální položky seznamu vrstv objektu CHART nahoru
    /// </summary>
    class CLShiftUp : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled { get => Owner is ListBox && (Owner as ListBox).SelectedItem != null && (Owner as ListBox).SelectedIndex != 0; }

        /// <exclude/>
        public override void Run() { (Owner as CustomListBox).ShiftUpItem(); }
    }
    /// <summary>
    /// Posunutí aktuální položky seznamu vrstv objektu CHART dolu
    /// </summary>
    class CLShiftDown : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled { get => Owner is ListBox && (Owner as ListBox).SelectedItem != null && (Owner as ListBox).SelectedIndex != ((Owner as ListBox).Items.Count - 1); }

        /// <exclude/>
        public override void Run() { (Owner as CustomListBox).ShiftDownItem(); }
    }

    /// <summary>
    /// Přidání nové položky do seznamu vrstv objektu CHART
    /// </summary>
    class CLAdd : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled { get => Owner is CustomListBox; }

        /// <exclude/>
        public override void Run() { (Owner as CustomListBox).AddItem(); }
    }
    /// <summary>
    /// Odstranění aktuální položky seznamu vrstv objektu CHART
    /// </summary>
    class CLDelete : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled { get => Owner is CustomListBox && (Owner as CustomListBox).SelectedItem != null; }

        /// <exclude/>
        public override void Run() { (Owner as CustomListBox).DeleteItem(); }
    }
    #endregion

    #region Validate
    /// <summary>
    /// Posunutí aktuální položky seznamu vrstv objektu CHART nahoru
    /// </summary>
    class GAlfValidateCommand : AbstractMenuCommand
    {
        /// <exclude/>
        public override bool IsEnabled { get => false; }
        /// <summary>
        /// Validace RTF.
        /// </summary>
        public override void Run() { Validate(true); }

        /// <summary>
        /// Validace dokumentu RTF
        /// </summary>
        /// <param name="waitDialog">Indikuje zobrazení čekacího dialogu</param>
        public static void Validate(bool waitDialog)
        {
            if (SimpleDesktop.Desktop.ActiveViewContent is AGraphicViewContent content)
                (content.PrimaryViewContent as GraphicView).ValidateDocument(waitDialog);
        }
    }
    #endregion
}
