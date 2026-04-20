//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.SurroundCommands.cs                    </Name>
//    <Description> Změna barvy písma                                           </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Linq;
using Gordic.GFE.WinClient.Gui;
using System.Windows.Forms;
using System.Drawing;
using Gordic.GFE.Parsers;
using Gordic.GFE.WinClient.Service;
using Gordic.GFE.Parsers.Utils;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.Services;
using Gordic.General;

namespace Gordic.GFE.WinClient.SurroundCommands
{
    /// <summary>
    /// příkazy nástrojové lišty
    /// </summary>
    public abstract class SurroundAbstractComboBoxCommand : ContentAbstractComboBoxCommand
    {
        // pokud vybraný objekt je editovatelný
        protected bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

        /// <summary>
        /// prostředník editace příslušné vlastnosti
        /// </summary>
        protected ISurroundHandler editable;
    }
    /// <summary>
    /// Změna barvy písma
    /// </summary>
    public class SurroundColor : SurroundAbstractComboBoxCommand
    {
        /// <summary>
        /// Dostupnost příkazu
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveContent as ISurroundHandler;
                return editable != null && editable.EnableSurroundColor && canEdit;
            }
        }

        /// <exclude/>
        protected override void LostFocus(LostFocusEventArgs focused) { SurroundService.Color = ColorService.GetGFEColor(comboBox.Text).Color; }
    }

    /// <summary>
    /// Změna barvy písma
    /// </summary>
    public class SurroundDashStyle : SurroundAbstractComboBoxCommand
    {
        /// <summary>
        /// Dostupnost příkazu
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveContent as ISurroundHandler;
                return editable != null && editable.EnableSurroundDashStyle && canEdit;
            }
        }

        /// <exclude/>
        protected override void LostFocus(LostFocusEventArgs focused)
        {
            SurroundService.DashStyle = ComplexDashStyle.Parse(comboBox.Text);
        }
    }

    /// <summary>
    /// informace o šířce vybraného objektu
    /// </summary>
    class SurroundWidth : SurroundAbstractComboBoxCommand
    {
        /// <summary>
        /// Indikuje dostupnost změny kroku šířky
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                editable = SimpleDesktop.Desktop.ActiveViewContent as ISurroundHandler;
                return editable != null && editable.EnableSurroundWidth && canEdit;
            }
        }

        /// <exclude/>
        protected override void LostFocus(LostFocusEventArgs focused)
        {
            try
            {
                SurroundService.Size = new SizeValue(comboBox.Text);
            }
            catch { }
        }
    }

    /// <summary>
    /// příkazy pro orámování
    /// </summary>
    class AbstractMenuSurroundTypeCommand : AbstractMenuServiceCommand
    {
        /// <summary>
        /// Objekt pro změnu
        /// </summary>
        public ISurroundHandler Editable { get; set; }
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceService.ServiceSelection?.SelectedComponents.Count > 0) || ServiceService.ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                Editable = SimpleDesktop.Desktop.ActiveViewContent as ISurroundHandler;
                return Editable != null && Editable.EnableSurround && canEdit;
            }
        }

        SurroundType type = SurroundType.nothing;
        /// <summary>
        /// Typ orámování
        /// </summary>
        public virtual SurroundType Type { get => type; }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ThreadService.SafeThreadAsyncCall(delegate
            {
                if (IsEnabled)
                {
                    isColor = false;
                    isMetrics = false;
                    isWidth = false;
                    GetWidth();
                    getMetrics();
                    GetColor();
                    List<ISurroundable> selected = ServiceService.ServiceSelection.SelectedComponents
                        .Select(cmp => cmp is ISurroundable ? cmp as ISurroundable : null)
                        .Distinct()
                        .ToList()
                        .FindAll(cm => cm != null);
                    if (selected.Count != 0)
                    {
                        bool next = true;
                        if (Type != SurroundType.nothing)
                        {
                            if (!isWidth || !isMetrics)
                            {
                                MessageService.ShowError(GResources.GetResourceText(29450440)); //RC 29450440 : Nutno uvést velikost rámečku nebo jeho časti!
                                next = false;
                            }
                            else if (string.IsNullOrEmpty(SurroundService.DashStyle))
                            {
                                MessageService.ShowError(GResources.GetResourceText(29450441)); //RC 29450441 : Nutno uvést styl rámečku nebo jeho časti!
                                next = false;
                            }
                            else if (!isColor)
                            {
                                MessageService.ShowError(GResources.GetResourceText(29450442)); //RC 29450442 : Nutno uvést barvu rámečku nebo jeho časti!
                                next = false;
                            }
                        }
                        if (next)
                            using (UndoRedoService.StartTransaction(GResources.GetResourceText(29450443))) //RC 29450443 : změna typu orámování
                            {
                                if (selected.Count == 1)
                                    RunSimple(selected.First());
                                else
                                    switch (Type)
                                    {
                                        case SurroundType.bottom:
                                        case SurroundType.left:
                                        case SurroundType.right:
                                        case SurroundType.top:
                                        case SurroundType.nothing:
                                            selected.ForEach(RunSimple);
                                            break;
                                        case SurroundType.aroundinside:
                                        case SurroundType.around:
                                            if (Editable is GrfEditor.GrfViewContent)
                                                selected.ForEach(RunSimple);
                                            else
                                                RunComplex(selected, Type);
                                            break;
                                        case SurroundType.middlehorizontal:
                                        case SurroundType.middlevertical:
                                        case SurroundType.inside:
                                        default:
                                            RunComplex(selected, Type);
                                            break;
                                    }
                                UndoRedoService.Commit();
                            }
                    }
                    isColor = false;
                    isMetrics = false;
                    isWidth = false;
                }
            });
        }

        void RunComplex(List<ISurroundable> selected, SurroundType tp)
        {
            if (selected != null && selected.Count > 1)
                switch (tp)
                {
                    case SurroundType.around:
                        List<ISurroundable> items = GetTopItems(selected);
                        if (items.Count != 0)
                            items.ForEach(item => RunSimple(item, SurroundType.top));

                        items = GetBottomItems(selected);
                        if (items.Count != 0)
                            items.ForEach(item => RunSimple(item, SurroundType.bottom));

                        items = GetLeftItems(selected);
                        if (items.Count != 0)
                            items.ForEach(item => RunSimple(item, SurroundType.left));

                        items = GetRightItems(selected);
                        if (items.Count != 0)
                            items.ForEach((item) => RunSimple(item, SurroundType.right));
                        break;
                    case SurroundType.aroundinside:
                        selected.ForEach(item => RunSimple(item, SurroundType.around));
                        break;
                    case SurroundType.inside:
                        List<ISurroundable> topItems = GetTopItems(selected);
                        if (topItems.Count != 0)
                        {
                            topItems.ForEach(item => RunSimple(item, SurroundType.bottom));

                            if (topItems.Count > 1)
                            {
                                topItems.Sort(new LeftComparer(false));
                                int index = 0;
                                while (index < topItems.Count - 1)
                                {
                                    RunSimple(topItems[index], SurroundType.right);
                                    index++;
                                }
                            }
                        }
                        List<ISurroundable> bottomItems = GetBottomItems(selected);
                        if (bottomItems.Count != 0)
                        {
                            bottomItems.ForEach(item => RunSimple(item, SurroundType.top));

                            if (bottomItems.Count > 1)
                            {
                                bottomItems.Sort(new LeftComparer(false));
                                int index = 0;
                                while (index < bottomItems.Count - 1)
                                {
                                    RunSimple(bottomItems[index], SurroundType.right);
                                    index++;
                                }
                            }
                        }
                        List<ISurroundable> leftItems = GetLeftItems(selected).FindAll(itm => !topItems.Contains(itm) && !bottomItems.Contains(itm));
                        if (leftItems.Count != 0)
                        {
                            leftItems.ForEach(item => RunSimple(item, SurroundType.right));

                            if (leftItems.Count > 1)
                            {
                                leftItems.Sort(new TopComparer(false));
                                int index = 0;
                                while (index < leftItems.Count - 1)
                                {
                                    RunSimple(leftItems[index], SurroundType.bottom);
                                    index++;
                                }
                            }
                        }
                        List<ISurroundable> rightItems = GetRightItems(selected).FindAll(itm => !topItems.Contains(itm) && !bottomItems.Contains(itm));
                        if (rightItems.Count != 0)
                        {
                            rightItems.ForEach(item => RunSimple(item, SurroundType.left));

                            if (rightItems.Count > 1)
                            {
                                rightItems.Sort(new TopComparer(false));
                                int index = 0;
                                while (index < rightItems.Count - 1)
                                {
                                    RunSimple(rightItems[index], SurroundType.bottom);
                                    index++;
                                }
                            }
                        }
                        List<ISurroundable> innerItems = selected.FindAll(itm => itm is ISurroundable
                            && !topItems.Contains(itm)
                            && !bottomItems.Contains(itm)
                            && !leftItems.Contains(itm)
                            && !rightItems.Contains(itm));
                        if (innerItems.Count != 0)
                            innerItems.ForEach(item => RunSimple(item, SurroundType.around));
                        break;
                    case SurroundType.middlehorizontal:
                        List<ISurroundable> hTopItems = GetTopItems(selected);
                        List<ISurroundable> hBottomItems = GetBottomItems(selected);
                        List<ISurroundable> hItems = hTopItems.Select(itm => !hBottomItems.Contains(itm) ? itm : null).ToList().FindAll(itm => itm != null);
                        if (hItems.Count != 0)
                            hItems.ForEach(item => RunSimple(item, SurroundType.bottom));
                        hItems = selected.Select(itm => !hTopItems.Contains(itm) && !hBottomItems.Contains(itm) ? itm : null)
                            .ToList()
                            .FindAll(itm => itm != null);
                        if (hItems.Count != 0)
                            hItems.ForEach((item) => RunSimple(item, SurroundType.bottom));
                        break;
                    case SurroundType.middlevertical:
                        List<ISurroundable> vLeftItems = GetLeftItems(selected);
                        List<ISurroundable> vRightItems = GetRightItems(selected);
                        List<ISurroundable> vItems = vLeftItems.Select(itm => !vRightItems.Contains(itm) ? itm : null)
                            .ToList()
                            .FindAll(itm => itm != null);
                        if (vItems.Count != 0)
                            vItems.ForEach((item) => RunSimple(item, SurroundType.right));
                        vItems = selected.Select(itm => !vLeftItems.Contains(itm) && !vRightItems.Contains(itm) ? itm : null)
                            .ToList()
                            .FindAll(itm => itm != null);
                        if (vItems.Count != 0)
                            vItems.ForEach((item) => RunSimple(item, SurroundType.right));
                        break;
                    default:
                        break;
                }
        }

        List<ISurroundable> GetRightItems(List<ISurroundable> selected)
        {
            selected.Sort(new LeftComparer(true));
            double fixValue = Math.Round((selected.First() as ISizable).Left + (selected.First() as ISizable).Width, 0);
            return selected.Select(itm => itm is ISurroundable && itm is ISizable ? itm as ISizable : null)
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null)
                .Select(itm => Math.Round(itm.Left + itm.Width, 0) == fixValue ? itm as ISurroundable : null)
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null);
        }
        List<ISurroundable> GetLeftItems(List<ISurroundable> selected)
        {
            selected.Sort(new LeftComparer(false));
            double fixValue = Math.Round((selected.First() as ISizable).Left, 0);
            return selected.Select(itm => itm is ISurroundable && itm is ISizable ? itm as ISizable : null)
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null)
                .Select(itm => Math.Round(itm.Left, 0) == fixValue ? itm as ISurroundable : null)
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null);
        }
        List<ISurroundable> GetBottomItems(List<ISurroundable> selected)
        {
            selected.Sort(new TopComparer(true));
            double fixValue = Math.Round((selected.First() as ISizable).Top + (selected.First() as ISizable).Height, 0);
            return selected.Select(itm => itm is ISurroundable && itm is ISizable ? itm as ISizable : null)
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null)
                .Select(itm => Math.Round(itm.Top + itm.Height, 0) == fixValue ? itm as ISurroundable : null)
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null);
        }

        List<ISurroundable> GetTopItems(List<ISurroundable> selected)
        {
            selected.Sort(new TopComparer(false));
            double fixValue = Math.Round((selected.First() as ISizable).Top, 0);
            return selected.Select(itm => itm is ISurroundable && itm is ISizable ? itm as ISizable : null)
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null)
                .Select(itm => Math.Round(itm.Top, 0) == fixValue ? itm as ISurroundable : null)
                .Distinct()
                .ToList()
                .FindAll(itm => itm != null);
        }
        void RunSimple(ISurroundable surroundable) { RunSimple(surroundable, Type); }
        void RunSimple(ISurroundable surroundable, SurroundType tp)
        {
            if (surroundable != null)
            {
                if (surroundable.Surround == null)
                    surroundable.Surround = new URComplexSurround().Initialize();
                if (surroundable.InnerSurround == null)
                    surroundable.InnerSurround = new URInnerSurround().Initialize();

                switch (tp)
                {
                    case SurroundType.aroundinside:
                    case SurroundType.around:
                        if ((Control.ModifierKeys & Keys.Control) == Keys.Control)
                            surroundable.Surround = new URComplexSurround().Initialize();
                        else if (isColor && !string.IsNullOrEmpty(SurroundService.DashStyle) && isWidth && isMetrics)
                            surroundable.Surround = new URComplexSurround().Initialize(
                            new GFEBorder(width, metrics, SurroundService.DashStyle, color), // left
                            new GFEBorder(width, metrics, SurroundService.DashStyle, color), // top
                            new GFEBorder(width, metrics, SurroundService.DashStyle, color), // right
                            new GFEBorder(width, metrics, SurroundService.DashStyle, color)  // bottom
                            , surroundable.Surround.Corners
                            , surroundable.Surround.Radius
                            , surroundable.Surround.InsideBorder);
                        break;
                    case SurroundType.nothing:
                        if ((Control.ModifierKeys & Keys.Control) == Keys.Control)
                            surroundable.Surround = new URComplexSurround().Initialize(
                            new GFEBorder(width, metrics, SurroundService.DashStyle, color), // left
                            new GFEBorder(width, metrics, SurroundService.DashStyle, color), // top
                            new GFEBorder(width, metrics, SurroundService.DashStyle, color), // right
                            new GFEBorder(width, metrics, SurroundService.DashStyle, color)  // bottom
                            , surroundable.Surround.Corners
                            , surroundable.Surround.Radius
                            , surroundable.Surround.InsideBorder);
                        else
                            surroundable.Surround = new URComplexSurround().Initialize();
                        break;
                    case SurroundType.right:
                        if ((Control.ModifierKeys & Keys.Control) == Keys.Control)
                        {
                            surroundable.Surround.DashStyle.RightValue = ComplexDashStyle.Unspec;
                            surroundable.Surround.FrameColor.RightValue = new URComplexColor().Initialize(ColorService.ComplexTransparent);
                            surroundable.Surround.Width.RightValue = "0";
                        }
                        else
                        {
                            surroundable.Surround.DashStyle.RightValue = SurroundService.DashStyle;
                            surroundable.Surround.Width.RightValue = SurroundService.Size.Value;
                            surroundable.Surround.FrameColor.RightValue = new URComplexColor().Initialize(SurroundService.Color);
                        }
                        break;
                    case SurroundType.top:
                        if ((Control.ModifierKeys & Keys.Control) == Keys.Control)
                        {
                            surroundable.Surround.DashStyle.TopValue = ComplexDashStyle.Unspec;
                            surroundable.Surround.FrameColor.TopValue = new URComplexColor().Initialize(ColorService.ComplexTransparent);
                            surroundable.Surround.Width.TopValue = "0";
                        }
                        else
                        {
                            surroundable.Surround.DashStyle.TopValue = SurroundService.DashStyle;
                            surroundable.Surround.Width.TopValue = SurroundService.Size.Value;
                            surroundable.Surround.FrameColor.TopValue = new URComplexColor().Initialize(SurroundService.Color);
                        }
                        break;
                    case SurroundType.bottom:
                        if ((Control.ModifierKeys & Keys.Control) == Keys.Control)
                        {
                            surroundable.Surround.DashStyle.BottomValue = ComplexDashStyle.Unspec;
                            surroundable.Surround.FrameColor.BottomValue = new URComplexColor().Initialize(ColorService.ComplexTransparent);
                            surroundable.Surround.Width.BottomValue = "0";
                        }
                        else
                        {
                            surroundable.Surround.DashStyle.BottomValue = SurroundService.DashStyle;
                            surroundable.Surround.Width.BottomValue = SurroundService.Size.Value;
                            surroundable.Surround.FrameColor.BottomValue = new URComplexColor().Initialize(SurroundService.Color);
                        }
                        break;
                    case SurroundType.left:
                        if ((Control.ModifierKeys & Keys.Control) == Keys.Control)
                        {
                            surroundable.Surround.DashStyle.LeftValue = ComplexDashStyle.Unspec;
                            surroundable.Surround.FrameColor.LeftValue = new URComplexColor().Initialize(ColorService.ComplexTransparent);
                            surroundable.Surround.Width.LeftValue = "0";
                        }
                        else
                        {
                            surroundable.Surround.DashStyle.LeftValue = SurroundService.DashStyle;
                            surroundable.Surround.Width.LeftValue = SurroundService.Size.Value;
                            surroundable.Surround.FrameColor.LeftValue = new URComplexColor().Initialize(SurroundService.Color);
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        GFEColor color;
        double width;
        Report.Implementation.Grr06Metrics metrics;
        bool isColor, isMetrics, isWidth;
        GFEColor GetColor()
        {
            LoggingService.Info(GResources.GetResourceText(29451493));
            if (!isColor && !SurroundService.Color.IsEmpty && SurroundService.Color != Color.Transparent)
            {
                color = new GFEColor(SurroundService.Color);
                isColor = true;
            }
            LoggingService.Info(GResources.GetResourceText(29451494) + ": " + color);

            return color;
        }
        double GetWidth()
        {
            LoggingService.Info(GResources.GetResourceText(29451495));
            if (!isWidth && !SurroundService.Size.IsEmpty)
            {
                width = SurroundService.Size.WithoutMetrics;
                isWidth = true;
            }
            LoggingService.Info(GResources.GetResourceText(29451496) + ": " + width);
            return width;
        }
        Report.Implementation.Grr06Metrics getMetrics()
        {
            LoggingService.Info(GResources.GetResourceText(29451497));
            if (!isMetrics && !SurroundService.Size.IsEmpty)
            {
                if (string.IsNullOrEmpty(SurroundService.Size.Metrics))
                    metrics = Report.Implementation.Grr06Metrics.Unspec;
                else
                    switch (SurroundService.Size.Metrics.ToLower())
                    {
                        case "mm":
                            metrics = Report.Implementation.Grr06Metrics.MMeters;
                            break;
                        case "pc":
                        case "%":
                            metrics = Report.Implementation.Grr06Metrics.Percent;
                            break;
                        case "pt":
                            metrics = Report.Implementation.Grr06Metrics.Points;
                            break;
                        case "tw":
                            metrics = Report.Implementation.Grr06Metrics.Twip;
                            break;
                        default:
                            metrics = Report.Implementation.Grr06Metrics.Unspec;
                            break;
                    }
                isMetrics = true;
            }
            LoggingService.Info(GResources.GetResourceText(29451498) + ": " + metrics);
            return metrics;
        }
    }

    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundNothing : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled && ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                {
                    bool allNothing = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.AllPixels == 0)),
                        allNonNothing = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.AllPixels != 0));
                    return allNothing ? Color.SkyBlue
                        : (allNonNothing ? base.BackColor : Color.IndianRed);
                }

                return base.BackColor;
            }
        }
        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.nothing; }
    }

    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundAround : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled && ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                {
                    bool allAround = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.AllPixels != 0)),
                        allNonAround = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.AllPixels == 0));
                    return allAround ? Color.SkyBlue
                        : (allNonAround ? base.BackColor : Color.IndianRed);
                }

                return base.BackColor;
            }
        }
        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.around; }
    }
    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundInside : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.inside; }
    }
    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundAroundInside : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.aroundinside; }
    }
    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundLeft : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled && ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                {
                    bool allLeft = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.LeftPixels != 0)),
                        allNonLeft = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.LeftPixels == 0));
                    return allLeft ? Color.SkyBlue
                        : (allNonLeft ? base.BackColor : Color.IndianRed);
                }

                return base.BackColor;
            }
        }

        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.left; }
    }
    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundRight : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled && ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                {
                    bool allRight = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.RightPixels != 0)),
                        allNonRight = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.RightPixels == 0));
                    return allRight ? Color.SkyBlue
                        : (allNonRight ? base.BackColor : Color.IndianRed);
                }

                return base.BackColor;
            }
        }

        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.right; }
    }
    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundTop : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled && ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                {
                    bool allTop = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.TopPixels != 0)),
                        allNonTop = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.TopPixels == 0));
                    return allTop ? Color.SkyBlue
                        : (allNonTop ? base.BackColor : Color.IndianRed);
                }

                return base.BackColor;
            }
        }

        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.top; }
    }
    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundBottom : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled && ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                {
                    bool allBottom = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.BottomPixels != 0)),
                        allNonBottom = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                        (cmp is ISurroundable && (cmp as ISurroundable).Surround != null && (cmp as ISurroundable).Surround.Width.BottomPixels == 0));
                    return allBottom ? Color.SkyBlue
                        : (allNonBottom ? base.BackColor : Color.IndianRed);
                }

                return base.BackColor;
            }
        }

        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.bottom; }
    }
    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundMiddleHorizontal : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.middlehorizontal; }
    }
    /// <summary>
    /// Změna barvy písma
    /// </summary>
    class SurroundMiddleVertical : AbstractMenuSurroundTypeCommand
    {
        /// <summary>
        /// Typ orámování
        /// </summary>
        public override SurroundType Type { get => SurroundType.middlevertical; }
    }
}