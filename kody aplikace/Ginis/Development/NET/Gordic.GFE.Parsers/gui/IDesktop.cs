//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.GFE.Parsers.IDesktop.cs                            </Name>
//    <Description> Základní rozhraní pracovního prostoru                       </Description>
//    <Author>      Mgr. Stepan Sukovych                                        </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2013-02-08                                                  </Created>
//  </FileHeader>

using System;
using System.Collections.Generic;
using System.Windows.Forms;
using Gordic.GFE.Parsers.Core;

namespace Gordic.GFE.Parsers.Gui
{
    /// <summary>
    /// Základní rozhraní pracovního prostoru
    /// </summary>
    public interface IDesktop : IMementoCapable
    {
        /// <summary>
        /// Hlavní formulář pracovního stolu
        /// </summary>
        Form MainForm { get; }
        /// <summary>
        /// Titulek okna
        /// </summary>
        string Title { get; set; }

        /// <summary>
        ///  Kolekce, v níž jsou uloženy všechny otevřené zobrazení obsahu 
        ///  (včetně všech sekundárních zobrazení obsahu).
        /// </summary>
        ICollection<IViewContent> ViewContentCollection { get; }
        /// <summary>
        /// Kolekce, v niž jsou uložené všechny primární pohledy na obsah
        /// </summary>
        ICollection<IViewContent> PrimaryViewContents { get; }
        /// <summary>
        /// Kolekce, v niž jsou uloženy všechny okna pracovního prostoru
        /// </summary>
        IList<IDesktopWindow> DesktopWindowCollection { get; }
        /// <summary>
        /// Aktivní okno pracovního stolu.
        /// Toto okno obsahuje aktivní pohled na obsah.
        /// </summary>
        IDesktopWindow ActiveDesktopWindow { get; }
        /// <summary>
        ///  Je volána, po změně vlastnosti ActiveDesktopWindow.
        /// </summary>
        event EventHandler ActiveDesktopWindowChanged;

        /// <summary>
        /// Aktivní pohled na obsah uvnitř aktivního okna pracovního stolu
        /// </summary>
        IViewContent ActiveViewContent { get; }
        /// <summary>
        /// Volá se po změně aktivního pohledu na obsah.
        /// </summary>
        event EventHandler ActiveViewContentChanged;

        /// <summary>
        /// Aktivní obsah, závislý na tom, kde se nachází focus.
        /// Pokud aktuálně je aktivní dokument, pak tato hodnota se rovná ActiveViewContent,
        /// jinak aktivní objekt.
        /// </summary>
        object ActiveContent { get; }
        /// <summary>
        /// Volá se po změně aktivního obsahu.
        /// </summary>
        event EventHandler ActiveContentChanged;

        /// <summary>
        /// Rozvržení pracovní plochy
        /// </summary>
        IDesktopLayout DesktopLayout { get; set; }

        /// <summary>
        /// Zjištění, zda GFE je aktivní aplikace ve Windows
        /// </summary>
        bool IsActiveWindow { get; }

        /// <summary>
        /// Inicializace pracovní plochy.
        /// </summary>
        void Initialize();

        /// <summary>
        /// Vložení nového <see cref="IViewContent"/> objektu na pracovní plochu a přepnutí na nový pohled.
        /// </summary>
        /// <param name="content">Vytvářený pohled</param>
        void ShowView(IViewContent content);
        /// <summary>
        /// Vložení nového <see cref="IViewContent"/> objektu na pracovní plochu.
        /// </summary>
        /// <param name="content">Vytvářený pohled</param>
        /// <param name="switchToOpenedView">Indikuje potřebu přepnutí na nový pohled</param>
        void ShowView(IViewContent content, bool switchToOpenedView);
        /// <summary>
        /// Zavření IViewContent obsahu pokud je otevřený.
        /// </summary>
        /// <param name="content">Obsah k zavření</param>
        void CloseContent(IViewContent content);
        /// <summary>
        /// Zavření všech pohledů pracovní plochy
        /// </summary>
        /// <param name="solution">indikuje potřebu zavření pouze všech pohledů sestavení</param>
        void CloseAllViews(bool solution = false);
        /// <summary>
        /// Opětovná inicializace všech komponent pracovní plochy, 
        /// může se volát po změně speciální vlastnosti která má vliv na rozložení
        /// </summary>
        void RedrawAllComponents();
        /// <summary>
        /// Aktualizace toolstrip renderer.
        /// </summary>
        void UpdateRenderer();

        /// <summary>
        /// Volá se po otevření pohledu
        /// </summary>
        /// <example>
        /// GFEModuleForm.DesktopCreated += delegate {
        /// 	GFEModuleForm.Desktop.ViewOpened += ...;
        /// };
        /// </example>
        event ViewContentEventHandler ViewOpened;
        /// <summary>
        /// Volá se po zavření pohledu pracovního stolu
        /// </summary>
        event ViewContentEventHandler ViewClosed;
        /// <summary>
        /// Volá se po stisknutí klávesy. Slouží k zachycení příkazových kláves.
        /// </summary>
        event System.Windows.Forms.KeyEventHandler ProcessCommandKey;

        /// <summary>
        /// Kolekce všech uložených aktivních oken plochy.
        /// </summary>
        IList<PadDescriptor> PadContentCollection { get; }
        /// <summary>
        /// Vložení nového objektu na plochu.
        /// </summary>
        /// <param name="content">Podložka s obsahem</param>
        void ShowPad(PadDescriptor content);

        /// <summary>
        /// Zavření a uvolnění.
        /// </summary>
        /// <param name="content">Podložka s obsahem</param>
        void UnloadPad(PadDescriptor content);

        /// <summary>
        /// Získání podložky specifického typu
        /// </summary>
        /// <param name="type">Typ podložky</param>
        PadDescriptor GetPad(Type type);

        /// <summary>
        /// Zobrazení dalšího obsahu
        /// </summary>
        bool ShowViewNext();
        /// <summary>
        /// Zobrazení předchozího obsahu
        /// </summary>
        bool ShowViewPrev();

        ///// <summary>
        ///// získání ovladače okna s fokusem 
        ///// </summary>
        ///// <returns></returns>
        //IntPtr GetFocus();
    }
}
