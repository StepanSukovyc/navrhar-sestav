//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.WinClient.TextContentCommands.cs                       </Name>
//    <Description> Operace Zpět                                                </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2012-10-22                                                  </Created>
//  </FileHeader>

using System.Drawing;
using Gordic.GFE.Parsers;
using Gordic.GFE.Parsers.Core;
using Gordic.GFE.Parsers.Gui;
using Gordic.GFE.WinClient.Gui;
using Gordic.GFE.Parsers.Dom;
using Gordic.GFE.Parsers.DefaultEditor;

namespace Gordic.GFE.WinClient.TextContentCommands
{
    #region ALIGN
    /// <summary>
    /// Zarovnávací příkazy
    /// </summary>
    class AbstractTextContentMenuCommand : AbstractMenuServiceCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled
        {
            get
            {
                // pokud vybraný objekt je editovatelný
                bool canEdit = !(ServiceSelection?.SelectedComponents.Count > 0) || ServiceSelection.SelectedComponents.Exists(cmp => (!(cmp is IReadOnly) || !(cmp as IReadOnly).ReadOnly));

                Editable = SimpleDesktop.Desktop.ActiveViewContent as IHasTextContent;
                return Editable != null && Editable.EnableChange && canEdit;
            }
        }
        /// <summary>
        /// editovatelný objekt
        /// </summary>
        protected IHasTextContent Editable { get; set; }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run() { }
    }

    /// <summary>
    /// Operace Zpět
    /// </summary>
    class ContentAlignTop : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allTop = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Vertical == VAlign.top)
                            || (cmp is IText && (cmp as IText).Align.Vertical == VAlign.top)),
                            allNonTop = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Vertical != VAlign.top)
                            || (cmp is IText && (cmp as IText).Align.Vertical != VAlign.top));
                        return allTop ? Color.SkyBlue
                            : (allNonTop ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.AlignTop();
        }
    }

    /// <summary>
    /// Operace Zpět
    /// </summary>
    class ContentAlignMiddle : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allMiddle = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Vertical == VAlign.center)
                            || (cmp is IText && (cmp as IText).Align.Vertical == VAlign.center)),
                            allNonMiddle = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Vertical != VAlign.center)
                            || (cmp is IText && (cmp as IText).Align.Vertical != VAlign.center));
                        return allMiddle ? Color.SkyBlue
                            : (allNonMiddle ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.AlignMiddle();
        }
    }

    /// <summary>
    /// Operace Zpět
    /// </summary>
    class ContentAlignBottom : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allBottom = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Vertical == VAlign.bottom)
                            || (cmp is IText && (cmp as IText).Align.Vertical == VAlign.bottom)),
                            allNonBottom = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Vertical != VAlign.bottom)
                            || (cmp is IText && (cmp as IText).Align.Vertical != VAlign.bottom));
                        return allBottom ? Color.SkyBlue
                            : (allNonBottom ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }
        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.AlignBottom();
        }
    }

    /// <summary>
    /// Operace Zpět
    /// </summary>
    class ContentAlignLeft : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allLeft = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Horizontal == HAlign.left)
                            || (cmp is IText && (cmp as IText).Align.Horizontal == HAlign.left)),
                            allNonLeft = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Horizontal != HAlign.left)
                            || (cmp is IText && (cmp as IText).Align.Horizontal != HAlign.left));
                        return allLeft ? Color.SkyBlue
                            : (allNonLeft ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.AlignLeft();
        }
    }

    /// <summary>
    /// Operace Zpět
    /// </summary>
    class ContentAlignCenter : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allCenter = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Horizontal == HAlign.center)
                            || (cmp is IText && (cmp as IText).Align.Horizontal == HAlign.center)),
                            allNonCenter = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Horizontal != HAlign.center)
                            || (cmp is IText && (cmp as IText).Align.Horizontal != HAlign.center));
                        return allCenter ? Color.SkyBlue
                            : (allNonCenter ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.AlignCenter();
        }
    }

    /// <summary>
    /// Operace Zpět
    /// </summary>
    class ContentAlignRight : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allRight = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Horizontal == HAlign.right)
                            || (cmp is IText && (cmp as IText).Align.Horizontal == HAlign.right)),
                            allNonRight = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Horizontal != HAlign.right)
                            || (cmp is IText && (cmp as IText).Align.Horizontal != HAlign.right));
                        return allRight ? Color.SkyBlue
                            : (allNonRight ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.AlignRight();
        }
    }

    /// <summary>
    /// Operace Zpět
    /// </summary>
    class ContentAlignJustify : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allJustify = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Horizontal == HAlign.justify)
                            || (cmp is IText && (cmp as IText).Align.Horizontal == HAlign.justify)),
                            allNonJustify = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && (cmp as ITextHandler).Text.Align.Horizontal != HAlign.justify)
                            || (cmp is IText && (cmp as IText).Align.Horizontal != HAlign.justify));
                        return allJustify ? Color.SkyBlue
                            : (allNonJustify ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.AlignJustify();
        }
    }
    #endregion

    #region FONT

    /// <summary>
    /// Operace nastavení regulárního řezu
    /// </summary>
    class ContentRegular : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allRegular = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && IsRegular((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && IsRegular((cmp as IText).TextFont.Style))),
                            allNonRegular = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && !IsRegular((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && !IsRegular((cmp as IText).TextFont.Style)));
                        return allRegular ? Color.SkyBlue
                            : (allNonRegular ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }

        bool IsRegular(FontStyleEnum fontStyleEnum) => fontStyleEnum == FontStyleEnum.Regular;

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.Regular();
        }
    }

    /// <summary>
    /// Operace nastavení tučného řezu
    /// </summary>
    class ContentBold : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allBold = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && IsBold((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && IsBold((cmp as IText).TextFont.Style))),
                            allNonBold = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && !IsBold((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && !IsBold((cmp as IText).TextFont.Style)));
                        return allBold ? Color.SkyBlue
                            : (allNonBold ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }

        bool IsBold(FontStyleEnum fontStyleEnum) =>
            fontStyleEnum == FontStyleEnum.Bold
                || fontStyleEnum == FontStyleEnum.BoldItalic
                || fontStyleEnum == FontStyleEnum.BoldItalicStrikeout
                || fontStyleEnum == FontStyleEnum.BoldItalicStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.BoldItalicUnderline
                || fontStyleEnum == FontStyleEnum.BoldStrikeout
                || fontStyleEnum == FontStyleEnum.BoldStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.BoldUnderline;

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.Bold();
        }
    }

    /// <summary>
    /// Operace nastavení kurzívy
    /// </summary>
    class ContentItalic : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allItalic = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && IsItalic((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && IsItalic((cmp as IText).TextFont.Style))),
                            allNonItalic = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && !IsItalic((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && !IsItalic((cmp as IText).TextFont.Style)));
                        return allItalic ? Color.SkyBlue
                            : (allNonItalic ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }

        bool IsItalic(FontStyleEnum fontStyleEnum) =>
            fontStyleEnum == FontStyleEnum.Italic
                || fontStyleEnum == FontStyleEnum.BoldItalic
                || fontStyleEnum == FontStyleEnum.BoldItalicStrikeout
                || fontStyleEnum == FontStyleEnum.BoldItalicStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.BoldItalicUnderline
                || fontStyleEnum == FontStyleEnum.ItalicStrikeout
                || fontStyleEnum == FontStyleEnum.ItalicStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.ItalicUnderline;

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.Italic();
        }
    }

    /// <summary>
    /// Operace nastavení podtrženého řezu
    /// </summary>
    class ContentUnderline : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allUnderline = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && IsUnderline((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && IsUnderline((cmp as IText).TextFont.Style))),
                            allNonUnderline = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && !IsUnderline((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && !IsUnderline((cmp as IText).TextFont.Style)));
                        return allUnderline ? Color.SkyBlue
                            : (allNonUnderline ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }

        bool IsUnderline(FontStyleEnum fontStyleEnum) =>
            fontStyleEnum == FontStyleEnum.BoldItalicStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.BoldItalicUnderline
                || fontStyleEnum == FontStyleEnum.BoldStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.BoldUnderline
                || fontStyleEnum == FontStyleEnum.ItalicStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.ItalicUnderline
                || fontStyleEnum == FontStyleEnum.StrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.Underline;

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.Underline();
        }
    }

    /// <summary>
    /// Operace nastavení přeškrtnutého řezu
    /// </summary>
    class ContentStrikeout : AbstractTextContentMenuCommand
    {
        /// <summary>
        /// barva pozadí
        /// </summary>
        public override Color BackColor
        {
            get
            {
                if (IsEnabled)
                    if (ServiceSelection != null && ServiceSelection.SelectedComponents.Count > 0)
                    {
                        bool allStrikeout = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && IsUnderline((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && IsUnderline((cmp as IText).TextFont.Style))),
                            allNonStrikeout = ServiceSelection.SelectedComponents.TrueForAll(cmp =>
                            (cmp is ITextHandler && (cmp as ITextHandler).Text != null && !IsUnderline((cmp as ITextHandler).Text.TextFont.Style))
                            || (cmp is IText && !IsUnderline((cmp as IText).TextFont.Style)));
                        return allStrikeout ? Color.SkyBlue
                            : (allNonStrikeout ? base.BackColor : Color.IndianRed);
                    }

                return base.BackColor;
            }
        }

        bool IsUnderline(FontStyleEnum fontStyleEnum) =>
            fontStyleEnum == FontStyleEnum.BoldItalicStrikeout
                || fontStyleEnum == FontStyleEnum.BoldItalicStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.BoldStrikeout
                || fontStyleEnum == FontStyleEnum.BoldStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.ItalicStrikeout
                || fontStyleEnum == FontStyleEnum.ItalicStrikeoutUnderline
                || fontStyleEnum == FontStyleEnum.Strikeout
                || fontStyleEnum == FontStyleEnum.StrikeoutUnderline;

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            if (IsEnabled && Editable != null)
                Editable.Strikeout();
        }
    }

    #endregion

    /// <summary>
    /// příkaz převodu výběru na velká písmena
    /// </summary>
    class ToUpper : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled { get => SimpleDesktop.Desktop.ActiveViewContent is ITextEditorControlProvider; }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ITextEditorControlProvider editable = SimpleDesktop.Desktop.ActiveViewContent as ITextEditorControlProvider;
            if (editable != null)
                TextEditor.Misc.ToUpperLower.ToUpper(editable.TextEditorControl);
        }
    }

    /// <summary>
    /// příkaz převodu výběru na malá písmena
    /// </summary>
    class ToLower : AbstractMenuCommand
    {
        /// <summary>
        /// Je operace dostupná?
        /// </summary>
        public override bool IsEnabled { get => SimpleDesktop.Desktop.ActiveViewContent is ITextEditorControlProvider; }

        /// <summary>
        /// Spuštění příkazu
        /// </summary>
        public override void Run()
        {
            ITextEditorControlProvider editable = SimpleDesktop.Desktop.ActiveViewContent as ITextEditorControlProvider;
            if (editable != null)
                TextEditor.Misc.ToUpperLower.ToLower(editable.TextEditorControl);
        }
    }

}
